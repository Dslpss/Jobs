import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import suppressResizeObserverError from "./utils/suppressResizeObserverError";
import setupStableResizeObserver from "./utils/stableResizeObserver";

// Configura um ResizeObserver estável primeiro
setupStableResizeObserver();

// Suprime erros do ResizeObserver que são comuns com Radix UI
suppressResizeObserverError();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
