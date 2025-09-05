import { useState, useCallback } from "react";
import { useToast } from "./use-toast";

/**
 * Hook personalizado para gerenciar estados de feedback
 */
export const useFeedback = (initialState = "idle") => {
  const [state, setState] = useState(initialState);
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const { toast } = useToast();

  // Estados possíveis: 'idle', 'loading', 'success', 'error', 'empty'

  const setLoading = useCallback((loadingMessage = "Carregando...") => {
    setState("loading");
    setMessage(loadingMessage);
  }, []);

  const setSuccess = useCallback(
    (successMessage = "Sucesso!", successData = null) => {
      setState("success");
      setMessage(successMessage);
      setData(successData);

      // Toast de sucesso
      toast({
        title: "Sucesso",
        description: successMessage,
        variant: "default",
      });
    },
    [toast]
  );

  const setError = useCallback(
    (errorMessage = "Erro inesperado") => {
      setState("error");
      setMessage(errorMessage);

      // Toast de erro
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    },
    [toast]
  );

  const setEmpty = useCallback(
    (emptyMessage = "Nenhum resultado encontrado") => {
      setState("empty");
      setMessage(emptyMessage);
    },
    []
  );

  const setIdle = useCallback(() => {
    setState("idle");
    setMessage("");
    setData(null);
  }, []);

  // Wrapper para chamadas assíncronas
  const execute = useCallback(
    async (
      asyncFunction,
      {
        loadingMessage = "Carregando...",
        successMessage = "Operação realizada com sucesso!",
        onSuccess,
        onError,
      } = {}
    ) => {
      try {
        setLoading(loadingMessage);

        const result = await asyncFunction();

        setSuccess(successMessage, result);

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (error) {
        const errorMessage = error?.message || "Erro inesperado";
        setError(errorMessage);

        if (onError) {
          onError(error);
        }

        throw error;
      }
    },
    [setLoading, setSuccess, setError]
  );

  // Wrapper específico para busca de dados
  const fetchData = useCallback(
    async (
      fetchFunction,
      {
        loadingMessage = "Buscando dados...",
        emptyMessage = "Nenhum resultado encontrado",
        emptyCheck = (data) =>
          !data || (Array.isArray(data) && data.length === 0),
      } = {}
    ) => {
      try {
        setLoading(loadingMessage);

        const result = await fetchFunction();

        if (emptyCheck(result)) {
          setEmpty(emptyMessage);
        } else {
          setState("success");
          setData(result);
          setMessage("");
        }

        return result;
      } catch (error) {
        const errorMessage = error?.message || "Erro ao buscar dados";
        setError(errorMessage);
        throw error;
      }
    },
    [setLoading, setEmpty, setError]
  );

  return {
    // Estados
    state,
    message,
    data,

    // Verificadores de estado
    isLoading: state === "loading",
    isSuccess: state === "success",
    isError: state === "error",
    isEmpty: state === "empty",
    isIdle: state === "idle",

    // Setters
    setLoading,
    setSuccess,
    setError,
    setEmpty,
    setIdle,

    // Executores
    execute,
    fetchData,

    // Reset
    reset: setIdle,
  };
};

/**
 * Hook para feedback de ações específicas (criar, editar, deletar)
 */
export const useActionFeedback = () => {
  const feedback = useFeedback();
  const { toast } = useToast();

  const create = useCallback(
    async (createFunction, itemName = "item") => {
      return feedback.execute(createFunction, {
        loadingMessage: `Criando ${itemName}...`,
        successMessage: `${itemName} criado com sucesso!`,
      });
    },
    [feedback]
  );

  const update = useCallback(
    async (updateFunction, itemName = "item") => {
      return feedback.execute(updateFunction, {
        loadingMessage: `Atualizando ${itemName}...`,
        successMessage: `${itemName} atualizado com sucesso!`,
      });
    },
    [feedback]
  );

  const remove = useCallback(
    async (deleteFunction, itemName = "item") => {
      return feedback.execute(deleteFunction, {
        loadingMessage: `Removendo ${itemName}...`,
        successMessage: `${itemName} removido com sucesso!`,
      });
    },
    [feedback]
  );

  const notify = useCallback(
    (type, title, description) => {
      toast({
        title,
        description,
        variant: type === "error" ? "destructive" : "default",
      });
    },
    [toast]
  );

  return {
    ...feedback,
    create,
    update,
    remove,
    notify,
  };
};

export default useFeedback;
