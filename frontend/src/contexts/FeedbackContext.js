import React, { createContext, useContext, useReducer } from "react";

/**
 * Configurações globais para o sistema de feedback
 */
const FeedbackConfig = {
  // Configurações de toast
  toast: {
    duration: 4000,
    position: "bottom-right",
    theme: "light",
    richColors: true,
    closeButton: true,
  },

  // Configurações de loading
  loading: {
    minDuration: 300, // Duração mínima para evitar flicker
    defaultText: "Carregando...",
    spinner: "pulse", // 'pulse', 'spin', 'bounce'
  },

  // Configurações de erro
  error: {
    showRetryButton: true,
    autoRetryCount: 0,
    retryDelay: 1000,
    defaultMessage: "Ops! Algo deu errado.",
  },

  // Configurações de sucesso
  success: {
    autoHideDuration: 3000,
    showAnimation: true,
    defaultMessage: "Operação realizada com sucesso!",
  },

  // Configurações de estados vazios
  empty: {
    showIllustration: true,
    showActionButton: true,
    defaultMessage: "Nenhum resultado encontrado.",
  },
};

/**
 * Estado inicial do feedback global
 */
const initialState = {
  globalLoading: false,
  globalError: null,
  notifications: [],
  config: FeedbackConfig,
};

/**
 * Reducer para gerenciar estado global de feedback
 */
const feedbackReducer = (state, action) => {
  switch (action.type) {
    case "SET_GLOBAL_LOADING":
      return {
        ...state,
        globalLoading: action.payload,
      };

    case "SET_GLOBAL_ERROR":
      return {
        ...state,
        globalError: action.payload,
        globalLoading: false,
      };

    case "CLEAR_GLOBAL_ERROR":
      return {
        ...state,
        globalError: null,
      };

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload
        ),
      };

    case "UPDATE_CONFIG":
      return {
        ...state,
        config: {
          ...state.config,
          ...action.payload,
        },
      };

    case "RESET":
      return {
        ...initialState,
        config: state.config,
      };

    default:
      return state;
  }
};

/**
 * Context para feedback global
 */
const FeedbackContext = createContext();

/**
 * Provider para feedback global
 */
export const FeedbackProvider = ({ children, config = {} }) => {
  const [state, dispatch] = useReducer(feedbackReducer, {
    ...initialState,
    config: { ...FeedbackConfig, ...config },
  });

  const actions = {
    // Loading global
    setGlobalLoading: (loading) => {
      dispatch({ type: "SET_GLOBAL_LOADING", payload: loading });
    },

    // Erro global
    setGlobalError: (error) => {
      dispatch({ type: "SET_GLOBAL_ERROR", payload: error });
    },

    clearGlobalError: () => {
      dispatch({ type: "CLEAR_GLOBAL_ERROR" });
    },

    // Notificações
    addNotification: (notification) => {
      const id = Date.now() + Math.random();
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: { ...notification, id },
      });

      // Auto remove notification
      if (notification.duration !== 0) {
        setTimeout(() => {
          actions.removeNotification(id);
        }, notification.duration || state.config.toast.duration);
      }

      return id;
    },

    removeNotification: (id) => {
      dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
    },

    // Configuração
    updateConfig: (newConfig) => {
      dispatch({ type: "UPDATE_CONFIG", payload: newConfig });
    },

    // Reset
    reset: () => {
      dispatch({ type: "RESET" });
    },
  };

  return (
    <FeedbackContext.Provider value={{ ...state, ...actions }}>
      {children}
    </FeedbackContext.Provider>
  );
};

/**
 * Hook para usar o contexto de feedback
 */
export const useGlobalFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "useGlobalFeedback deve ser usado dentro de FeedbackProvider"
    );
  }
  return context;
};

/**
 * Hook para configurações de feedback
 */
export const useFeedbackConfig = () => {
  const { config, updateConfig } = useGlobalFeedback();
  return { config, updateConfig };
};

/**
 * Hook para notificações globais
 */
export const useGlobalNotifications = () => {
  const { notifications, addNotification, removeNotification } =
    useGlobalFeedback();

  return {
    notifications,
    notify: (type, title, message, options = {}) => {
      return addNotification({
        type,
        title,
        message,
        ...options,
      });
    },
    success: (title, message, options = {}) => {
      return addNotification({
        type: "success",
        title,
        message,
        ...options,
      });
    },
    error: (title, message, options = {}) => {
      return addNotification({
        type: "error",
        title,
        message,
        ...options,
      });
    },
    info: (title, message, options = {}) => {
      return addNotification({
        type: "info",
        title,
        message,
        ...options,
      });
    },
    warning: (title, message, options = {}) => {
      return addNotification({
        type: "warning",
        title,
        message,
        ...options,
      });
    },
    dismiss: removeNotification,
  };
};

/**
 * Hook para loading global
 */
export const useGlobalLoading = () => {
  const { globalLoading, setGlobalLoading } = useGlobalFeedback();

  return {
    isLoading: globalLoading,
    setLoading: setGlobalLoading,
    withLoading: async (asyncFn) => {
      setGlobalLoading(true);
      try {
        const result = await asyncFn();
        return result;
      } finally {
        setGlobalLoading(false);
      }
    },
  };
};

/**
 * Hook para erro global
 */
export const useGlobalError = () => {
  const { globalError, setGlobalError, clearGlobalError } = useGlobalFeedback();

  return {
    error: globalError,
    setError: setGlobalError,
    clearError: clearGlobalError,
    handleError: (error) => {
      console.error("Global error:", error);
      setGlobalError({
        message: error.message || "Erro inesperado",
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });
    },
  };
};

export default FeedbackConfig;
