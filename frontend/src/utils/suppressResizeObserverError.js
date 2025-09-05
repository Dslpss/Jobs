// Utilitário para suprimir erros do ResizeObserver
// Este erro é comum com bibliotecas como Radix UI e não afeta a funcionalidade

const suppressResizeObserverError = () => {
  // Sobrescreve o ResizeObserver original para adicionar tratamento de erro
  const OriginalResizeObserver = window.ResizeObserver;

  if (OriginalResizeObserver) {
    window.ResizeObserver = class extends OriginalResizeObserver {
      constructor(callback) {
        super((entries, observer) => {
          // Usa requestAnimationFrame para processar as observações de forma assíncrona
          window.requestAnimationFrame(() => {
            try {
              callback(entries, observer);
            } catch (error) {
              // Suprime apenas erros relacionados ao ResizeObserver loop
              if (
                error.message &&
                error.message.includes(
                  "ResizeObserver loop completed with undelivered notifications"
                )
              ) {
                console.warn(
                  "ResizeObserver loop suprimido (comportamento normal)"
                );
                return;
              }
              // Re-lança outros erros
              throw error;
            }
          });
        });
      }
    };
  }

  // Captura erros de ResizeObserver que são comuns mas não críticos
  const originalError = console.error;

  console.error = (...args) => {
    // Filtra erros específicos do ResizeObserver
    if (
      args.length > 0 &&
      typeof args[0] === "string" &&
      args[0].includes(
        "ResizeObserver loop completed with undelivered notifications"
      )
    ) {
      // Não exibe este erro específico no console
      return;
    }

    // Para outros erros, comportamento normal
    originalError.apply(console, args);
  };

  // Também captura via window.addEventListener para erros não capturados
  window.addEventListener("error", (event) => {
    if (
      event.message &&
      event.message.includes(
        "ResizeObserver loop completed with undelivered notifications"
      )
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });

  // Para promises rejeitadas
  window.addEventListener("unhandledrejection", (event) => {
    if (
      event.reason &&
      event.reason.message &&
      event.reason.message.includes(
        "ResizeObserver loop completed with undelivered notifications"
      )
    ) {
      event.preventDefault();
    }
  });

  // Debounce global para ResizeObserver
  let resizeObserverTimeout;
  const originalRequestAnimationFrame = window.requestAnimationFrame;

  window.requestAnimationFrame = (callback) => {
    clearTimeout(resizeObserverTimeout);
    resizeObserverTimeout = setTimeout(() => {
      return originalRequestAnimationFrame(callback);
    }, 0);
  };
};

export default suppressResizeObserverError;
