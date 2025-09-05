import React, { useState } from "react";
import {
  LoadingSpinner,
  EnhancedLoader,
  ButtonLoader,
  SkeletonLoader,
  ListLoader,
} from "../components/LoadingComponents";
import {
  ErrorState,
  EmptyState,
  SuccessState,
  InlineLoader,
  LoadingState,
} from "../components/FeedbackComponents";
import {
  LoadingButton,
  ActionButton,
  ConfirmButton,
} from "../components/InteractiveButtons";
import { useFeedback, useActionFeedback } from "../hooks/useFeedback";
import { toasts } from "../utils/toastHelpers";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

/**
 * Página de demonstração dos componentes de feedback
 * Esta página mostra todos os componentes de feedback em ação
 */
const FeedbackDemoPage = () => {
  const [demoState, setDemoState] = useState("idle");
  const feedback = useFeedback();
  const actionFeedback = useActionFeedback();

  // Simulação de operações assíncronas
  const simulateAsyncOperation = (duration = 2000, shouldFail = false) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error("Operação falhou para demonstração"));
        } else {
          resolve({ message: "Operação concluída com sucesso!" });
        }
      }, duration);
    });
  };

  // Demonstrações de loading
  const handleLoadingDemo = async () => {
    setDemoState("loading");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setDemoState("success");
    setTimeout(() => setDemoState("idle"), 2000);
  };

  // Demonstração de toast
  const handleToastDemo = (type) => {
    switch (type) {
      case "success":
        toasts.success("Sucesso!", "Operação realizada com sucesso");
        break;
      case "error":
        toasts.error("Erro!", "Algo deu errado na operação");
        break;
      case "info":
        toasts.info("Informação", "Esta é uma mensagem informativa");
        break;
      case "promise":
        toasts.promise(simulateAsyncOperation(2000), {
          loading: "Processando...",
          success: "Operação concluída!",
          error: "Falha na operação",
        });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Demonstração de Componentes de Feedback
        </h1>

        {/* Loading Components */}
        <Card>
          <CardHeader>
            <CardTitle>Componentes de Loading</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Loading Spinner</h3>
                <LoadingSpinner size="sm" text="Pequeno" />
                <LoadingSpinner size="md" text="Médio" />
                <LoadingSpinner size="lg" text="Grande" />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Button Loader</h3>
                <div className="flex items-center gap-2">
                  <ButtonLoader />
                  <span>Carregando...</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Inline Loader</h3>
                <InlineLoader text="Processando dados..." />
              </div>
            </div>

            {demoState === "loading" && (
              <div className="mt-8">
                <h3 className="font-semibold mb-4">
                  Enhanced Loader (Demonstração)
                </h3>
                <EnhancedLoader
                  title="Processando demonstração..."
                  subtitle="Esta é uma demonstração do loader avançado"
                />
              </div>
            )}

            <Button
              onClick={handleLoadingDemo}
              disabled={demoState === "loading"}
            >
              Demonstrar Enhanced Loader
            </Button>
          </CardContent>
        </Card>

        {/* Skeleton Components */}
        <Card>
          <CardHeader>
            <CardTitle>Skeleton Loaders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Skeleton Loader (Cards)</h3>
                <SkeletonLoader cardCount={2} />
              </div>

              <div>
                <h3 className="font-semibold mb-4">List Loader</h3>
                <ListLoader items={3} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* State Components */}
        <Card>
          <CardHeader>
            <CardTitle>Estados de Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Estado de Erro</h3>
                <ErrorState
                  title="Erro de demonstração"
                  message="Esta é uma demonstração de como os erros são exibidos"
                  onRetry={() =>
                    toasts.info("Retry", "Botão de retry clicado!")
                  }
                />
              </div>

              <div>
                <h3 className="font-semibold mb-4">Estado Vazio</h3>
                <EmptyState
                  title="Nenhum resultado"
                  message="Esta é uma demonstração do estado vazio"
                  action={() => toasts.info("Ação", "Botão de ação clicado!")}
                />
              </div>
            </div>

            {demoState === "success" && (
              <div>
                <h3 className="font-semibold mb-4">Estado de Sucesso</h3>
                <SuccessState
                  title="Demonstração concluída!"
                  message="A demonstração foi executada com sucesso"
                  action={() => setDemoState("idle")}
                  actionText="Voltar ao início"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Interactive Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Botões Interativos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <LoadingButton
                loading={false}
                onClick={() => toasts.info("Clique", "Botão normal clicado!")}
              >
                Botão Normal
              </LoadingButton>

              <ActionButton
                action={() => simulateAsyncOperation(1500)}
                loadingText="Processando..."
                onSuccess={() => toasts.success("Sucesso", "Ação executada!")}
                onError={() => toasts.error("Erro", "Falha na ação")}
              >
                Botão com Ação
              </ActionButton>

              <ConfirmButton
                onConfirm={() => toasts.info("Confirmado", "Ação confirmada!")}
                confirmText="Confirmar?"
              >
                Botão de Confirmação
              </ConfirmButton>
            </div>
          </CardContent>
        </Card>

        {/* Toast Demonstrations */}
        <Card>
          <CardHeader>
            <CardTitle>Demonstração de Toasts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                onClick={() => handleToastDemo("success")}
                variant="default"
              >
                Toast Sucesso
              </Button>

              <Button
                onClick={() => handleToastDemo("error")}
                variant="destructive"
              >
                Toast Erro
              </Button>

              <Button onClick={() => handleToastDemo("info")} variant="outline">
                Toast Info
              </Button>

              <Button
                onClick={() => handleToastDemo("promise")}
                variant="secondary"
              >
                Promise Toast
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* useFeedback Hook Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Demonstração do Hook useFeedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button
                onClick={() =>
                  feedback.execute(() => simulateAsyncOperation(2000, false), {
                    loadingMessage: "Executando operação...",
                    successMessage: "Operação executada com sucesso!",
                  })
                }
                disabled={feedback.isLoading}
              >
                Executar Operação (Sucesso)
              </Button>

              <Button
                onClick={() =>
                  feedback.execute(() => simulateAsyncOperation(2000, true), {
                    loadingMessage: "Executando operação...",
                    successMessage: "Operação executada com sucesso!",
                  })
                }
                disabled={feedback.isLoading}
                variant="destructive"
              >
                Executar Operação (Erro)
              </Button>

              <Button onClick={feedback.reset} variant="outline">
                Reset
              </Button>
            </div>

            {/* Estado atual do feedback */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p>
                <strong>Estado atual:</strong> {feedback.state}
              </p>
              {feedback.message && (
                <p>
                  <strong>Mensagem:</strong> {feedback.message}
                </p>
              )}

              {feedback.isLoading && (
                <div className="mt-2">
                  <LoadingState title={feedback.message} />
                </div>
              )}

              {feedback.isError && (
                <div className="mt-2">
                  <ErrorState
                    title="Erro na operação"
                    message={feedback.message}
                    onRetry={feedback.reset}
                  />
                </div>
              )}

              {feedback.isSuccess && (
                <div className="mt-2">
                  <SuccessState
                    title="Sucesso!"
                    message={feedback.message}
                    action={feedback.reset}
                    actionText="Nova operação"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackDemoPage;
