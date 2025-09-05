import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

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

  // Monitor authentication state with Firebase
  useEffect(() => {
    let mounted = true;

    try {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!mounted) return;

        try {
          if (firebaseUser) {
            // Get additional user data from Firestore
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            const userData = userDoc.exists() ? userDoc.data() : {};

            // Check if user is admin
            const adminDoc = await getDoc(doc(db, "admins", firebaseUser.uid));
            const isAdmin = adminDoc.exists();

            if (mounted) {
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                isAdmin,
                ...userData,
              });
            }
          } else {
            if (mounted) {
              setUser(null);
            }
          }
        } catch (error) {
          console.error("Error in auth state change:", error);
          // Fallback: set basic user data without Firestore
          if (firebaseUser && mounted) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
            });
          } else if (mounted) {
            setUser(null);
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      });

      return () => {
        mounted = false;
        unsubscribe();
      };
    } catch (error) {
      console.error("Error setting up auth listener:", error);
      if (mounted) {
        setLoading(false);
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Aguardar um pouco para garantir que o onAuthStateChanged seja disparado
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Atualizar o estado do usuário imediatamente após o login
      try {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        const adminDoc = await getDoc(doc(db, "admins", firebaseUser.uid));
        const isAdmin = adminDoc.exists();

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          isAdmin,
          ...userData,
        });
      } catch (firestoreError) {
        console.error("Error fetching user data:", firestoreError);
        // Fallback: definir dados básicos do usuário
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      }

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: getErrorMessage(error.code),
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Update profile with display name
      await updateProfile(firebaseUser, {
        displayName: name,
      });

      // Save additional user data to Firestore
      await setDoc(doc(db, "users", firebaseUser.uid), {
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: getErrorMessage(error.code),
      };
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return {
        success: false,
        error: "Erro ao fazer logout",
      };
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get user-friendly error messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "Usuário não encontrado";
      case "auth/wrong-password":
        return "Senha incorreta";
      case "auth/invalid-email":
        return "Email inválido";
      case "auth/user-disabled":
        return "Conta desabilitada";
      case "auth/email-already-in-use":
        return "Este email já está em uso";
      case "auth/weak-password":
        return "Senha muito fraca. Use pelo menos 6 caracteres";
      case "auth/network-request-failed":
        return "Erro de conexão. Verifique sua internet";
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente mais tarde";
      case "auth/invalid-credential":
        return "Credenciais inválidas";
      default:
        return "Erro inesperado. Tente novamente";
    }
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
