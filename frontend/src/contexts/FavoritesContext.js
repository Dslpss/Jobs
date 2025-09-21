import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavorites deve ser usado dentro de um FavoritesProvider"
    );
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const { user } = useAuth();

  // Carregar favoritos - do Firestore se logado, senão do localStorage
  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      try {
        if (user) {
          // Carregar do Firestore para usuário logado
          const userFavoritesRef = doc(db, "favorites", user.uid);
          const userFavoritesSnap = await getDoc(userFavoritesRef);

          if (userFavoritesSnap.exists()) {
            const data = userFavoritesSnap.data();
            setFavorites(data.favorites || []);
            setLastSaved(data.updatedAt?.toDate?.() || new Date());
          } else {
            // Se não existe no Firestore, tentar carregar do localStorage e migrar
            const storedFavorites = localStorage.getItem("jobFavorites");
            if (storedFavorites) {
              const parsedFavorites = JSON.parse(storedFavorites);
              setFavorites(parsedFavorites);
              setLastSaved(new Date());

              // Migrar para Firestore
              await setDoc(userFavoritesRef, {
                favorites: parsedFavorites,
                updatedAt: new Date(),
              });
              localStorage.removeItem("jobFavorites"); // Limpar localStorage após migração
            } else {
              setFavorites([]);
              setLastSaved(new Date());
            }
          }
        } else {
          // Usuário não logado - usar localStorage
          const storedFavorites = localStorage.getItem("jobFavorites");
          if (storedFavorites) {
            const parsedFavorites = JSON.parse(storedFavorites);
            setFavorites(parsedFavorites);
            setLastSaved(new Date());
          } else {
            setFavorites([]);
            setLastSaved(new Date());
          }
        }
      } catch (error) {
        setFavorites([]);
        setLastSaved(new Date());
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  // Salvar favoritos - no Firestore se logado, senão no localStorage
  useEffect(() => {
    const saveFavorites = async () => {
      if (loading) {
        return; // Não salvar enquanto está carregando
      }

      // Evitar salvamento desnecessário se acabou de carregar
      const now = new Date();
      if (lastSaved && now - lastSaved < 1000) {
        return;
      }

      try {
        if (user) {
          // Salvar no Firestore para usuário logado
          const userFavoritesRef = doc(db, "favorites", user.uid);
          if (favorites.length > 0) {
            await setDoc(userFavoritesRef, {
              favorites,
              updatedAt: new Date(),
            });
            setLastSaved(new Date());
          } else {
            // Se não há favoritos, deletar o documento
            await deleteDoc(userFavoritesRef);
            setLastSaved(new Date());
          }
        } else {
          // Usuário não logado - salvar no localStorage
          if (favorites.length > 0) {
            localStorage.setItem("jobFavorites", JSON.stringify(favorites));
            setLastSaved(new Date());
          } else {
            localStorage.removeItem("jobFavorites");
            setLastSaved(new Date());
          }
        }
      } catch (error) {}
    };

    // Pequeno delay para evitar conflitos de carregamento/salvamento
    const timeoutId = setTimeout(saveFavorites, 200);
    return () => clearTimeout(timeoutId);
  }, [favorites, user, loading, lastSaved]);

  const addToFavorites = (job) => {
    setFavorites((prev) => {
      // Verificar se já está nos favoritos
      if (prev.some((fav) => fav.id === job.id)) {
        return prev; // Já está favoritado
      }
      return [...prev, job];
    });
  };

  const removeFromFavorites = (jobId) => {
    setFavorites((prev) => prev.filter((job) => job.id !== jobId));
  };

  const isFavorite = (jobId) => {
    return favorites.some((job) => job.id === jobId);
  };

  const toggleFavorite = (job) => {
    if (isFavorite(job.id)) {
      removeFromFavorites(job.id);
    } else {
      addToFavorites(job);
    }
  };

  const value = {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
