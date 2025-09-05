// Polyfill melhorado para ResizeObserver que previne loops infinitos

class StableResizeObserver {
  constructor(callback) {
    this.callback = callback;
    this.entries = [];
    this.observedElements = new Map();
    this.frameId = null;
    this.isProcessing = false;
  }

  observe(element, options = {}) {
    if (!element || this.observedElements.has(element)) {
      return;
    }

    const resizeHandler = () => {
      if (this.isProcessing) return;

      const rect = element.getBoundingClientRect();
      const entry = {
        target: element,
        contentRect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
        },
        borderBoxSize: [
          {
            blockSize: rect.height,
            inlineSize: rect.width,
          },
        ],
        contentBoxSize: [
          {
            blockSize: rect.height,
            inlineSize: rect.width,
          },
        ],
        devicePixelContentBoxSize: [
          {
            blockSize: rect.height,
            inlineSize: rect.width,
          },
        ],
      };

      this.entries.push(entry);
      this.scheduleCallback();
    };

    // Observa mudanças usando MutationObserver e eventos de resize
    const mutationObserver = new MutationObserver(resizeHandler);
    mutationObserver.observe(element, {
      attributes: true,
      attributeFilter: ["style", "class"],
      childList: true,
      subtree: true,
    });

    window.addEventListener("resize", resizeHandler);

    this.observedElements.set(element, {
      mutationObserver,
      resizeHandler,
    });

    // Trigger inicial
    resizeHandler();
  }

  unobserve(element) {
    const observers = this.observedElements.get(element);
    if (observers) {
      observers.mutationObserver.disconnect();
      window.removeEventListener("resize", observers.resizeHandler);
      this.observedElements.delete(element);
    }
  }

  disconnect() {
    this.observedElements.forEach((observers) => {
      observers.mutationObserver.disconnect();
      window.removeEventListener("resize", observers.resizeHandler);
    });
    this.observedElements.clear();
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  scheduleCallback() {
    if (this.frameId || this.isProcessing) {
      return;
    }

    this.frameId = requestAnimationFrame(() => {
      this.frameId = null;
      if (this.entries.length === 0) return;

      this.isProcessing = true;

      try {
        const entries = [...this.entries];
        this.entries = [];
        this.callback(entries, this);
      } catch (error) {
        console.warn("ResizeObserver callback error:", error);
      } finally {
        this.isProcessing = false;
      }
    });
  }
}

// Substitui o ResizeObserver original se estiver causando problemas
const setupStableResizeObserver = () => {
  // Verifica se já existe um ResizeObserver nativo
  if (window.ResizeObserver && typeof window.ResizeObserver === "function") {
    // Cria um wrapper que captura erros
    const OriginalResizeObserver = window.ResizeObserver;

    window.ResizeObserver = class extends OriginalResizeObserver {
      constructor(callback) {
        const wrappedCallback = (entries, observer) => {
          try {
            // Usa um timeout para quebrar possíveis loops
            setTimeout(() => {
              callback(entries, observer);
            }, 0);
          } catch (error) {
            if (!error.message?.includes("ResizeObserver loop")) {
              console.error("ResizeObserver error:", error);
            }
          }
        };

        super(wrappedCallback);
      }
    };
  } else {
    // Se não existe ResizeObserver nativo, usa nosso polyfill
    window.ResizeObserver = StableResizeObserver;
  }
};

export default setupStableResizeObserver;
