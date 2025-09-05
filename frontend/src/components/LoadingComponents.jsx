import React from "react";
import { Loader2, Code, Terminal, Zap, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * Componente de Loading com várias variações
 */
const LoadingSpinner = ({
  size = "md",
  variant = "default",
  text,
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const variants = {
    default: "border-emerald-200 border-t-emerald-600",
    primary: "border-blue-200 border-t-blue-600",
    success: "border-green-200 border-t-green-600",
    danger: "border-red-200 border-t-red-600",
    warning: "border-yellow-200 border-t-yellow-600",
  };

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <div
        className={cn(
          "border-4 rounded-full animate-spin",
          sizeClasses[size],
          variants[variant]
        )}
      />
      {text && <span className="ml-3 text-gray-600 font-medium">{text}</span>}
    </div>
  );
};

/**
 * Loading com efeitos especiais para páginas principais
 */
const EnhancedLoader = ({ title = "Carregando...", subtitle, className }) => {
  return (
    <div className={cn("text-center py-16", className)}>
      <div className="relative inline-block">
        {/* Spinner principal */}
        <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6"></div>

        {/* Spinner reverso */}
        <div
          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-teal-400 rounded-full animate-spin mx-auto"
          style={{
            animationDirection: "reverse",
            animationDuration: "1.5s",
          }}
        />

        {/* Pulso de fundo */}
        <div className="absolute inset-0 w-16 h-16 bg-emerald-500/10 rounded-full animate-ping delay-1000" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center justify-center">
          <Code className="h-5 w-5 mr-2 text-emerald-600" />
          {title}
        </h3>
        {subtitle && (
          <p className="text-slate-600 flex items-center justify-center">
            <Terminal className="h-4 w-4 mr-2 text-slate-500" />
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Loading inline para botões
 */
const ButtonLoader = ({ size = "sm", className, ...props }) => {
  return (
    <Loader2
      className={cn(
        "animate-spin",
        size === "sm" && "h-4 w-4",
        size === "md" && "h-5 w-5",
        size === "lg" && "h-6 w-6",
        className
      )}
      {...props}
    />
  );
};

/**
 * Loading para cards/skeleton
 */
const SkeletonLoader = ({ rows = 3, className, cardCount = 4 }) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: cardCount }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 shadow-sm border animate-pulse"
          >
            {/* Header skeleton */}
            <div className="h-6 bg-slate-200 rounded mb-4 w-3/4"></div>

            {/* Content rows */}
            {Array.from({ length: rows }).map((_, j) => (
              <div
                key={j}
                className={cn(
                  "h-4 bg-slate-200 rounded mb-2",
                  j === rows - 1 ? "w-1/2" : "w-full"
                )}
              />
            ))}

            {/* Footer skeleton */}
            <div className="flex gap-2 mt-4">
              <div className="h-6 bg-slate-200 rounded w-16"></div>
              <div className="h-6 bg-slate-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Loading para listas
 */
const ListLoader = ({ items = 5, className }) => {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 animate-pulse">
          <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export {
  LoadingSpinner,
  EnhancedLoader,
  ButtonLoader,
  SkeletonLoader,
  ListLoader,
};
