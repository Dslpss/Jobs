import React, { useState, useEffect } from "react";
import { CheckCircle, X, Sparkles, RefreshCw } from "lucide-react";

const UpdateNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [lastUpdateTime] = useState(() => new Date().toISOString());

  useEffect(() => {
    // Verificar se há uma atualização mais recente
    const lastSeenUpdate = localStorage.getItem("lastSeenUpdate");
    const currentUpdate = new Date().toDateString();

    if (!lastSeenUpdate || lastSeenUpdate !== currentUpdate) {
      // Mostrar notificação após um pequeno delay
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcknowledge = () => {
    // Marcar como vista
    localStorage.setItem("lastSeenUpdate", new Date().toDateString());
    setShowNotification(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!showNotification) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:right-4 left-4 sm:left-auto z-50 animate-in slide-in-from-right duration-500">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg shadow-2xl p-4 w-full sm:max-w-sm border border-emerald-400/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-300 rounded-full animate-ping"></div>
            </div>
            <span className="font-semibold text-sm">Site Atualizado!</span>
          </div>
          <button
            onClick={handleAcknowledge}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-sm text-emerald-50">
            ✨ Novas correções e melhorias foram implementadas!
          </p>

          <div className="text-xs text-emerald-100 space-y-1">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3" />
              <span>Correção de bugs visuais</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3" />
              <span>Melhoria na performance</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3" />
              <span>Sistema de feedback aprimorado</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <button
              onClick={handleRefresh}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xs font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center space-x-1"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Recarregar</span>
            </button>
            <button
              onClick={handleAcknowledge}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium py-2 px-3 rounded-md transition-colors"
            >
              Entendi
            </button>
          </div>
        </div>

        {/* Timestamp */}
        <div className="mt-3 pt-2 border-t border-emerald-400/30">
          <p className="text-xs text-emerald-100 opacity-75">
            Atualizado em:{" "}
            {new Date(lastUpdateTime).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateNotification;
