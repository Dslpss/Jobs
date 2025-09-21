import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useUserProfile } from "../contexts/UserProfileContext";
import { Plus, X, Code, Zap } from "lucide-react";

// Lista de tecnologias comuns para sugestões
const COMMON_TECHNOLOGIES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "PHP",
  "Ruby",
  "Go",
  "Rust",
  "React",
  "Vue.js",
  "Angular",
  "Svelte",
  "Next.js",
  "Nuxt.js",
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Spring",
  "Laravel",
  "HTML",
  "CSS",
  "Sass",
  "Tailwind CSS",
  "Bootstrap",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Firebase",
  "AWS",
  "Azure",
  "GCP",
  "Docker",
  "Kubernetes",
  "Git",
  "Linux",
  "Agile",
  "Scrum",
  "DevOps",
];

const SkillsSelector = () => {
  const { profile, addSkill, removeSkill, addTechnology, removeTechnology } =
    useUserProfile();
  const [newSkill, setNewSkill] = useState("");
  const [newTechnology, setNewTechnology] = useState("");

  const handleAddSkill = async () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      await addSkill(newSkill.trim());
      setNewSkill("");
    }
  };

  const handleRemoveSkill = async (skill) => {
    await removeSkill(skill);
  };

  const handleAddTechnology = async (technology) => {
    if (!profile.technologies.includes(technology)) {
      await addTechnology(technology);
    }
  };

  const handleRemoveTechnology = async (technology) => {
    await removeTechnology(technology);
  };

  const handleAddCustomTechnology = async () => {
    if (
      newTechnology.trim() &&
      !profile.technologies.includes(newTechnology.trim())
    ) {
      await addTechnology(newTechnology.trim());
      setNewTechnology("");
    }
  };

  const availableTechnologies = COMMON_TECHNOLOGIES.filter(
    (tech) => !profile.technologies.includes(tech)
  );

  return (
    <div className="space-y-6">
      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Habilidades Técnicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Adicionar nova skill */}
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Ex: Liderança, Comunicação, Gestão de Projetos..."
              onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
            />
            <Button onClick={handleAddSkill} disabled={!newSkill.trim()}>
              <Plus className="w-4 h-4 mr-1" />
              Adicionar
            </Button>
          </div>

          {/* Lista de skills */}
          <div className="flex flex-wrap gap-2">
            {profile.skills.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Nenhuma habilidade adicionada
              </p>
            ) : (
              profile.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="flex items-center gap-1 pr-1"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tecnologias */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Tecnologias de Interesse
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tecnologias selecionadas */}
          <div>
            <h4 className="font-medium mb-2">Suas Tecnologias:</h4>
            <div className="flex flex-wrap gap-2">
              {profile.technologies.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Nenhuma tecnologia selecionada
                </p>
              ) : (
                profile.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    className="flex items-center gap-1 pr-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {tech}
                    <button
                      onClick={() => handleRemoveTechnology(tech)}
                      className="ml-1 hover:bg-blue-300 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </div>

          {/* Adicionar tecnologia customizada */}
          <div className="flex gap-2">
            <Input
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              placeholder="Adicionar tecnologia customizada..."
              onKeyPress={(e) =>
                e.key === "Enter" && handleAddCustomTechnology()
              }
            />
            <Button
              onClick={handleAddCustomTechnology}
              disabled={!newTechnology.trim()}
            >
              <Plus className="w-4 h-4 mr-1" />
              Adicionar
            </Button>
          </div>

          {/* Sugestões de tecnologias */}
          <div>
            <h4 className="font-medium mb-2">Sugestões Populares:</h4>
            <div className="flex flex-wrap gap-2">
              {availableTechnologies.slice(0, 20).map((tech) => (
                <Button
                  key={tech}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddTechnology(tech)}
                  className="text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {tech}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsSelector;
