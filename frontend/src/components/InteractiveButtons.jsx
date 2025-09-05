import React from "react";
import { Button } from "./ui/button";
import { ButtonLoader } from "./LoadingComponents";
import { cn } from "../lib/utils";

/**
 * Botão com estado de loading integrado
 */
const LoadingButton = React.forwardRef(
  (
    {
      children,
      loading = false,
      loadingText,
      disabled,
      className,
      size = "default",
      variant = "default",
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = (e) => {
      if (loading || disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <Button
        ref={ref}
        disabled={loading || disabled}
        className={cn(
          "transition-all duration-200",
          loading && "cursor-not-allowed",
          className
        )}
        size={size}
        variant={variant}
        onClick={handleClick}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <ButtonLoader size={size === "sm" ? "sm" : "md"} />
            {loadingText || "Carregando..."}
          </div>
        ) : (
          children
        )}
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

/**
 * Botão de ação com feedback automático
 */
const ActionButton = React.forwardRef(
  (
    {
      children,
      action,
      loadingText = "Processando...",
      successText,
      onSuccess,
      onError,
      disabled,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const [loading, setLoading] = React.useState(false);

    const handleClick = async (e) => {
      if (loading || disabled) {
        e.preventDefault();
        return;
      }

      try {
        setLoading(true);
        const result = await action();

        if (onSuccess) {
          onSuccess(result);
        }
      } catch (error) {
        if (onError) {
          onError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <LoadingButton
        ref={ref}
        loading={loading}
        loadingText={loadingText}
        disabled={disabled}
        variant={variant}
        onClick={handleClick}
        {...props}
      >
        {children}
      </LoadingButton>
    );
  }
);

ActionButton.displayName = "ActionButton";

/**
 * Botão com confirmação
 */
const ConfirmButton = React.forwardRef(
  (
    {
      children,
      confirmText = "Tem certeza?",
      onConfirm,
      variant = "destructive",
      ...props
    },
    ref
  ) => {
    const [showConfirm, setShowConfirm] = React.useState(false);

    const handleClick = (e) => {
      e.preventDefault();

      if (!showConfirm) {
        setShowConfirm(true);
        // Auto-hide after 3 seconds
        setTimeout(() => setShowConfirm(false), 3000);
        return;
      }

      onConfirm?.();
      setShowConfirm(false);
    };

    return (
      <Button
        ref={ref}
        variant={showConfirm ? variant : "outline"}
        onClick={handleClick}
        className={cn(
          "transition-all duration-200",
          showConfirm && "animate-pulse"
        )}
        {...props}
      >
        {showConfirm ? confirmText : children}
      </Button>
    );
  }
);

ConfirmButton.displayName = "ConfirmButton";

export { LoadingButton, ActionButton, ConfirmButton };
