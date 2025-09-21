import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const UserProfileContext = createContext();

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error(
      "useUserProfile deve ser usado dentro de um UserProfileProvider"
    );
  }
  return context;
};

export const UserProfileProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    // Dados pessoais
    displayName: "",
    photoURL: "",
    bio: "",

    // Experiência profissional
    experiences: [],

    // Skills e tecnologias
    skills: [],
    technologies: [],

    // Preferências de trabalho
    workPreferences: {
      salaryRange: { min: "", max: "" },
      locations: [],
      modalities: [], // remoto, presencial, híbrido
      jobTypes: [], // CLT, PJ, etc.
    },

    // Histórico
    viewedJobs: [],
    lastUpdated: null,
  });

  const [loading, setLoading] = useState(true);

  // Carregar perfil do usuário
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const profileRef = doc(db, "userProfiles", user.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          const profileData = profileSnap.data();
          setProfile({
            ...profileData,
            lastUpdated: profileData.lastUpdated?.toDate?.() || new Date(),
          });
        } else {
          // Criar perfil inicial com dados do auth
          const initialProfile = {
            displayName: user.displayName || "",
            photoURL: user.photoURL || "",
            bio: "",
            experiences: [],
            skills: [],
            technologies: [],
            workPreferences: {
              salaryRange: { min: "", max: "" },
              locations: [],
              modalities: [],
              jobTypes: [],
            },
            viewedJobs: [],
            lastUpdated: new Date(),
          };

          await setDoc(profileRef, initialProfile);
          setProfile(initialProfile);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  // Salvar perfil
  const saveProfile = async (updatedProfile) => {
    if (!user) return;

    try {
      const profileRef = doc(db, "userProfiles", user.uid);
      const profileToSave = {
        ...updatedProfile,
        lastUpdated: new Date(),
      };

      await setDoc(profileRef, profileToSave);
      setProfile(profileToSave);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Atualizar perfil parcialmente
  const updateProfile = async (updates) => {
    if (!user) return false;

    try {
      const profileRef = doc(db, "userProfiles", user.uid);
      const updatedProfile = {
        ...profile,
        ...updates,
        lastUpdated: new Date(),
      };

      await setDoc(profileRef, updatedProfile);
      setProfile(updatedProfile);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Adicionar experiência
  const addExperience = async (experience) => {
    const updatedExperiences = [
      ...profile.experiences,
      { ...experience, id: Date.now() },
    ];
    return await updateProfile({ experiences: updatedExperiences });
  };

  // Remover experiência
  const removeExperience = async (experienceId) => {
    const updatedExperiences = profile.experiences.filter(
      (exp) => exp.id !== experienceId
    );
    return await updateProfile({ experiences: updatedExperiences });
  };

  // Adicionar skill
  const addSkill = async (skill) => {
    if (!profile.skills.includes(skill)) {
      const updatedSkills = [...profile.skills, skill];
      return await updateProfile({ skills: updatedSkills });
    }
    return true;
  };

  // Remover skill
  const removeSkill = async (skill) => {
    const updatedSkills = profile.skills.filter((s) => s !== skill);
    return await updateProfile({ skills: updatedSkills });
  };

  // Adicionar tecnologia de interesse
  const addTechnology = async (technology) => {
    if (!profile.technologies.includes(technology)) {
      const updatedTechnologies = [...profile.technologies, technology];
      return await updateProfile({ technologies: updatedTechnologies });
    }
    return true;
  };

  // Remover tecnologia
  const removeTechnology = async (technology) => {
    const updatedTechnologies = profile.technologies.filter(
      (t) => t !== technology
    );
    return await updateProfile({ technologies: updatedTechnologies });
  };

  // Adicionar vaga visualizada ao histórico
  const addViewedJob = async (job) => {
    const viewedJob = {
      id: job.id,
      title: job.title,
      viewedAt: new Date(),
    };

    // Manter apenas as últimas 50 vagas visualizadas
    const updatedViewedJobs = [
      viewedJob,
      ...profile.viewedJobs.filter((v) => v.id !== job.id),
    ].slice(0, 50);
    return await updateProfile({ viewedJobs: updatedViewedJobs });
  };

  // Atualizar preferências de trabalho
  const updateWorkPreferences = async (preferences) => {
    const updatedPreferences = { ...profile.workPreferences, ...preferences };
    return await updateProfile({ workPreferences: updatedPreferences });
  };

  const value = {
    profile,
    loading,
    saveProfile,
    updateProfile,
    addExperience,
    removeExperience,
    addSkill,
    removeSkill,
    addTechnology,
    removeTechnology,
    addViewedJob,
    updateWorkPreferences,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};
