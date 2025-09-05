import React from "react";
import {
  useGlobalFeedback,
  useGlobalNotifications,
} from "../contexts/FeedbackContext";
import { EnhancedLoader } from "./LoadingComponents";
import { ErrorState } from "./FeedbackComponents";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

/**
 * Componente para exibir loading global
 */
const GlobalLoadingOverlay = () => {
  const { globalLoading } = useGlobalFeedback();

  if (!globalLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-2xl max-w-md w-full mx-4">
        <EnhancedLoader
          title="Processando..."
          subtitle="Por favor, aguarde enquanto processamos sua solicitação"
        />
      </div>
    </div>
  );
};

/**
 * Componente para exibir erro global
 */
const GlobalErrorOverlay = () => {
  const { globalError, clearGlobalError } = useGlobalFeedback();

  if (!globalError) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-2xl max-w-md w-full mx-4">
        <ErrorState
          title="Erro Global"
          message={globalError.message}
          onRetry={clearGlobalError}
          retryText="Fechar"
        />
      </div>
    </div>
  );
};

/**
 * Componente para exibir notificações
 */
const NotificationIcon = ({ type }) => {
  const iconProps = { className: "h-5 w-5" };

  switch (type) {
    case "success":
      return <CheckCircle {...iconProps} className="h-5 w-5 text-green-600" />;
    case "error":
      return <AlertCircle {...iconProps} className="h-5 w-5 text-red-600" />;
    case "warning":
      return (
        <AlertTriangle {...iconProps} className="h-5 w-5 text-yellow-600" />
      );
    case "info":
    default:
      return <Info {...iconProps} className="h-5 w-5 text-blue-600" />;
  }
};

/**
 * Item de notificação individual
 */
const NotificationItem = ({ notification, onDismiss }) => {
  const getAlertVariant = (type) => {
    switch (type) {
      case "error":
        return "destructive";
      case "warning":
        return "warning";
      case "success":
        return "success";
      case "info":
      default:
        return "default";
    }
  };

  return (
    <Alert
      variant={getAlertVariant(notification.type)}
      className="mb-3 pr-12 relative animate-in slide-in-from-right-full"
    >
      <NotificationIcon type={notification.type} />
      <div className="flex-1">
        <AlertTitle className="text-sm font-medium">
          {notification.title}
        </AlertTitle>
        {notification.message && (
          <AlertDescription className="text-sm">
            {notification.message}
          </AlertDescription>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-6 w-6 p-0"
        onClick={() => onDismiss(notification.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  );
};

/**
 * Container de notificações
 */
const NotificationsContainer = () => {
  const { notifications, dismiss } = useGlobalNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-40 max-w-sm w-full space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={dismiss}
        />
      ))}
    </div>
  );
};

/**
 * Componente principal que combina todos os overlays de feedback
 */
const GlobalFeedbackOverlay = () => {
  return (
    <>
      <GlobalLoadingOverlay />
      <GlobalErrorOverlay />
      <NotificationsContainer />
    </>
  );
};

export default GlobalFeedbackOverlay;

// Exports individuais para uso específico
export {
  GlobalLoadingOverlay,
  GlobalErrorOverlay,
  NotificationsContainer,
  NotificationItem,
};
