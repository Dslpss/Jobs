import React from "react";
import {
  AlertCircle,
  CheckCircle,
  Search,
  Zap,
  RefreshCw,
  Info,
  XCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

/**
 * Componente para estados de erro
 */
const ErrorState = ({
  title = "Ops! Algo deu errado",
  message,
  onRetry,
  retryText = "Tentar novamente",
  className,
  variant = "default",
}) => {
  const variants = {
    default: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  };

  const IconComponent =
    variant === "warning" ? AlertCircle : variant === "info" ? Info : XCircle;

  return (
    <div className={cn("text-center py-16", className)}>
      <div className="relative inline-block mb-6">
        <IconComponent
          className={cn("h-16 w-16 mx-auto animate-pulse", variants[variant])}
        />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
        {message && <p className="text-slate-600">{message}</p>}

        {onRetry && (
          <Button
            onClick={onRetry}
            className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              {retryText}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

/**
 * Componente para estado vazio
 */
const EmptyState = ({
  title = "Nenhum resultado encontrado",
  message = "Tente ajustar seus filtros ou fazer uma nova busca",
  icon: Icon = Search,
  action,
  actionText = "Nova busca",
  className,
}) => {
  return (
    <div className={cn("text-center py-16", className)}>
      <div className="relative inline-block mb-6">
        <Icon className="h-16 w-16 text-slate-400 mx-auto" />
        <div className="absolute inset-0 animate-ping">
          <Icon className="h-16 w-16 text-slate-200 mx-auto" />
        </div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <h3 className="text-2xl font-bold text-slate-700">{title}</h3>
        <p className="text-slate-500">{message}</p>

        {action && (
          <Button
            onClick={action}
            variant="outline"
            className="group relative overflow-hidden border-2 border-emerald-300 text-emerald-700 hover:text-white hover:border-emerald-500 transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            <span className="relative flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              {actionText}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

/**
 * Componente para estado de sucesso
 */
const SuccessState = ({
  title = "Sucesso!",
  message,
  action,
  actionText = "Continuar",
  className,
  autoHide = false,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoHide, duration]);

  if (!isVisible) return null;

  return (
    <div className={cn("text-center py-12", className)}>
      <div className="relative inline-block mb-6">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <div className="absolute inset-0 animate-ping delay-300">
          <CheckCircle className="h-16 w-16 text-green-200 mx-auto" />
        </div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
        {message && <p className="text-slate-600">{message}</p>}

        {action && (
          <Button
            onClick={action}
            className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center">
              {actionText}
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

/**
 * Componente para feedback de carregamento inline
 */
const InlineLoader = ({ text = "Carregando...", size = "sm", className }) => {
  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      <RefreshCw
        className={cn(
          "animate-spin",
          size === "sm" && "h-4 w-4",
          size === "md" && "h-5 w-5",
          size === "lg" && "h-6 w-6"
        )}
      />
      <span className="text-slate-600 font-medium">{text}</span>
    </div>
  );
};

/**
 * Componente para estados de carregamento específicos
 */
const LoadingState = ({
  title = "Carregando dados...",
  subtitle,
  variant = "default",
  className,
}) => {
  const variants = {
    default: "from-emerald-600 to-teal-600",
    primary: "from-blue-600 to-indigo-600",
    secondary: "from-purple-600 to-pink-600",
  };

  return (
    <div className={cn("text-center py-12", className)}>
      <div className="relative inline-block mb-6">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
      </div>

      <div className="space-y-2">
        <h3
          className={cn(
            "text-lg font-semibold bg-gradient-to-r bg-clip-text text-transparent",
            variants[variant]
          )}
        >
          {title}
        </h3>
        {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
      </div>
    </div>
  );
};

export { ErrorState, EmptyState, SuccessState, InlineLoader, LoadingState };
