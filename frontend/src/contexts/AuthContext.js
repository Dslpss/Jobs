import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar se há usuário logado no localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulação de login - em produção seria uma chamada para API
      const mockUser = {
        id: Date.now(),
        email,
        name: email.split("@")[0],
        createdAt: new Date().toISOString(),
      };

      // Salvar no localStorage
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);

      return { success: true };
    } catch (error) {
      return { success: false, error: "Erro ao fazer login" };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Simulação de cadastro - em produção seria uma chamada para API
      const mockUser = {
        id: Date.now(),
        email,
        name,
        createdAt: new Date().toISOString(),
      };

      // Salvar no localStorage
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);

      return { success: true };
    } catch (error) {
      return { success: false, error: "Erro ao criar conta" };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
