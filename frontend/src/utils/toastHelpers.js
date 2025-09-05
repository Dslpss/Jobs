import { toast } from "../hooks/use-toast";
import { CheckCircle, XCircle, AlertCircle, Info, Loader2 } from "lucide-react";

/**
 * Sistema de notificações personalizado com feedback visual aprimorado
 */

// Toast de sucesso
export const successToast = (title, description) => {
  return toast({
    title,
    description,
    variant: "default",
    duration: 4000,
  });
};

// Toast de erro
export const errorToast = (title, description) => {
  return toast({
    title,
    description,
    variant: "destructive",
    duration: 6000,
  });
};

// Toast de informação
export const infoToast = (title, description) => {
  return toast({
    title,
    description,
    variant: "default",
    duration: 4000,
  });
};

// Promise toast - para operações assíncronas
export const promiseToast = async (
  promise,
  { loading = "Carregando...", success = "Sucesso!", error = "Erro!" } = {}
) => {
  // Toast de loading
  const loadingToast = toast({
    title: "Carregando...",
    description: loading,
    duration: Infinity,
  });

  try {
    const result = await promise;

    // Dismiss loading toast
    loadingToast.dismiss();

    // Success toast
    successToast(
      "Sucesso",
      typeof success === "function" ? success(result) : success
    );

    return result;
  } catch (err) {
    // Dismiss loading toast
    loadingToast.dismiss();

    // Error toast
    errorToast("Erro", typeof error === "function" ? error(err) : error);

    throw err;
  }
};

// Função utilitária para toast baseado em status HTTP
export const statusToast = (status, title, description) => {
  if (status >= 200 && status < 300) {
    return successToast(title, description);
  } else if (status >= 400 && status < 500) {
    return errorToast(title, description);
  } else if (status >= 500) {
    return errorToast(title, description);
  } else {
    return infoToast(title, description);
  }
};

// Objeto com todos os toasts para facilitar importação
export const toasts = {
  success: successToast,
  error: errorToast,
  info: infoToast,
  promise: promiseToast,
  status: statusToast,
};

export default toasts;
