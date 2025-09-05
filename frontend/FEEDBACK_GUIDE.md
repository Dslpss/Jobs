# Guia de Componentes de Feedback Visual

Este guia explica como usar o sistema completo de feedback visual implementado no projeto.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Componentes de Loading](#componentes-de-loading)
3. [Componentes de Estado](#componentes-de-estado)
4. [Botões Interativos](#botões-interativos)
5. [Sistema de Toast](#sistema-de-toast)
6. [Hooks Personalizados](#hooks-personalizados)
7. [Contexto Global](#contexto-global)
8. [Exemplos de Uso](#exemplos-de-uso)
9. [Configuração](#configuração)

## 🎯 Visão Geral

O sistema de feedback visual fornece uma experiência de usuário consistente e intuitiva através de:

- **Loading States**: Indicadores visuais para operações assíncronas
- **Error Handling**: Tratamento elegante de erros com opções de retry
- **Success Feedback**: Confirmações visuais de ações bem-sucedidas
- **Toast Notifications**: Notificações não-intrusivas
- **Empty States**: Estados informativos quando não há dados
- **Global Feedback**: Sistema centralizado de feedback

## 🔄 Componentes de Loading

### LoadingSpinner

```jsx
import { LoadingSpinner } from '../components/LoadingComponents';

// Uso básico
<LoadingSpinner />

// Com tamanho personalizado e texto
<LoadingSpinner size="lg" text="Carregando dados..." />

// Variações de tamanho: sm, md, lg
```

### EnhancedLoader

```jsx
import { EnhancedLoader } from "../components/LoadingComponents";

<EnhancedLoader
  title="Processando solicitação..."
  subtitle="Isso pode levar alguns momentos"
/>;
```

### ButtonLoader

```jsx
import { ButtonLoader } from "../components/LoadingComponents";

// Para uso dentro de botões
<button disabled={loading}>
  {loading && <ButtonLoader />}
  Salvar
</button>;
```

### SkeletonLoader

```jsx
import { SkeletonLoader } from "../components/LoadingComponents";

// Para simular cards de conteúdo
<SkeletonLoader cardCount={3} />;
```

### ListLoader

```jsx
import { ListLoader } from "../components/LoadingComponents";

// Para simular listas
<ListLoader items={5} />;
```

## ⚠️ Componentes de Estado

### ErrorState

```jsx
import { ErrorState } from "../components/FeedbackComponents";

<ErrorState
  title="Erro ao carregar dados"
  message="Não foi possível conectar com o servidor"
  onRetry={() => fetchData()}
  retryText="Tentar novamente"
/>;
```

### EmptyState

```jsx
import { EmptyState } from "../components/FeedbackComponents";

<EmptyState
  title="Nenhuma vaga encontrada"
  message="Tente ajustar os filtros de busca"
  action={() => clearFilters()}
  actionText="Limpar filtros"
/>;
```

### SuccessState

```jsx
import { SuccessState } from "../components/FeedbackComponents";

<SuccessState
  title="Sucesso!"
  message="Sua candidatura foi enviada"
  action={() => navigateToJobs()}
  actionText="Ver vagas"
/>;
```

### LoadingState

```jsx
import { LoadingState } from "../components/FeedbackComponents";

<LoadingState title="Enviando candidatura..." />;
```

## 🎛️ Botões Interativos

### LoadingButton

```jsx
import { LoadingButton } from "../components/InteractiveButtons";

<LoadingButton
  loading={isSubmitting}
  onClick={handleSubmit}
  loadingText="Enviando..."
>
  Enviar Candidatura
</LoadingButton>;
```

### ActionButton

```jsx
import { ActionButton } from "../components/InteractiveButtons";

<ActionButton
  action={async () => await deleteJob(jobId)}
  loadingText="Excluindo..."
  onSuccess={() => toast.success("Job excluído!")}
  onError={(error) => toast.error("Erro ao excluir")}
>
  Excluir Vaga
</ActionButton>;
```

### ConfirmButton

```jsx
import { ConfirmButton } from "../components/InteractiveButtons";

<ConfirmButton
  onConfirm={() => deleteAllJobs()}
  confirmText="Tem certeza que deseja excluir todas as vagas?"
  variant="destructive"
>
  Excluir Todas
</ConfirmButton>;
```

## 🍞 Sistema de Toast

### Usando toastHelpers

```jsx
import { toasts } from "../utils/toastHelpers";

// Toast de sucesso
toasts.success("Sucesso!", "Operação realizada com sucesso");

// Toast de erro
toasts.error("Erro!", "Algo deu errado");

// Toast informativo
toasts.info("Info", "Informação importante");

// Promise toast (acompanha uma operação assíncrona)
toasts.promise(fetchData(), {
  loading: "Carregando...",
  success: "Dados carregados!",
  error: "Erro ao carregar dados",
});
```

## 🎣 Hooks Personalizados

### useFeedback

```jsx
import { useFeedback } from "../hooks/useFeedback";

const MyComponent = () => {
  const feedback = useFeedback();

  const handleSubmit = async () => {
    await feedback.execute(() => submitForm(data), {
      loadingMessage: "Enviando formulário...",
      successMessage: "Formulário enviado com sucesso!",
    });
  };

  return (
    <div>
      {feedback.isLoading && <LoadingSpinner text={feedback.message} />}
      {feedback.isError && (
        <ErrorState message={feedback.message} onRetry={feedback.reset} />
      )}
      {feedback.isSuccess && <SuccessState message={feedback.message} />}

      <button onClick={handleSubmit} disabled={feedback.isLoading}>
        Enviar
      </button>
    </div>
  );
};
```

### useActionFeedback

```jsx
import { useActionFeedback } from "../hooks/useFeedback";

const MyComponent = () => {
  const { execute, isLoading, error } = useActionFeedback();

  const handleAction = () => {
    execute(async () => {
      await performAction();
    });
  };

  return (
    <LoadingButton loading={isLoading} onClick={handleAction}>
      Executar Ação
    </LoadingButton>
  );
};
```

## 🌐 Contexto Global

### FeedbackProvider

```jsx
import { FeedbackProvider } from "../contexts/FeedbackContext";

// No App.js ou componente raiz
<FeedbackProvider>
  <YourApp />
</FeedbackProvider>;
```

### useGlobalFeedback

```jsx
import {
  useGlobalLoading,
  useGlobalError,
  useGlobalNotifications,
} from "../contexts/FeedbackContext";

const MyComponent = () => {
  const { setLoading, withLoading } = useGlobalLoading();
  const { handleError } = useGlobalError();
  const { success, error } = useGlobalNotifications();

  const handleGlobalAction = async () => {
    try {
      await withLoading(async () => {
        await performGlobalAction();
        success("Sucesso!", "Ação global executada");
      });
    } catch (err) {
      handleError(err);
    }
  };

  return <button onClick={handleGlobalAction}>Ação Global</button>;
};
```

## 📝 Exemplos de Uso

### Exemplo 1: Página com Loading e Estados

```jsx
import React from "react";
import { useFeedback } from "../hooks/useFeedback";
import {
  LoadingSpinner,
  ErrorState,
  EmptyState,
} from "../components/FeedbackComponents";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const feedback = useFeedback();

  useEffect(() => {
    feedback.fetchData(async () => {
      const response = await jobsApi.getJobs();
      setJobs(response.data);
      return response.data;
    });
  }, []);

  if (feedback.isLoading) {
    return <LoadingSpinner text="Carregando vagas..." />;
  }

  if (feedback.isError) {
    return (
      <ErrorState
        title="Erro ao carregar vagas"
        message={feedback.message}
        onRetry={() => feedback.retry()}
      />
    );
  }

  if (jobs.length === 0) {
    return (
      <EmptyState
        title="Nenhuma vaga disponível"
        message="Não há vagas cadastradas no momento"
      />
    );
  }

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
```

### Exemplo 2: Formulário com Feedback

```jsx
import React from "react";
import { LoadingButton } from "../components/InteractiveButtons";
import { toasts } from "../utils/toastHelpers";

const JobForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await jobsApi.createJob(data);
      toasts.success("Sucesso!", "Vaga criada com sucesso");
      // Redirect ou limpar formulário
    } catch (error) {
      toasts.error("Erro", "Não foi possível criar a vaga");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}

      <LoadingButton
        type="submit"
        loading={isSubmitting}
        loadingText="Criando vaga..."
      >
        Criar Vaga
      </LoadingButton>
    </form>
  );
};
```

## ⚙️ Configuração

### Configuração Global do Feedback

```jsx
// Em App.js
<FeedbackProvider
  config={{
    toast: {
      duration: 5000,
      position: "top-center",
    },
    loading: {
      minDuration: 500,
      defaultText: "Aguarde...",
    },
  }}
>
  <App />
</FeedbackProvider>
```

### Configuração de Temas

```jsx
// Para customizar aparência
const customConfig = {
  toast: {
    theme: "dark",
    richColors: true,
  },
  loading: {
    spinner: "bounce",
  },
};
```

## 🚀 Página de Demonstração

Para ver todos os componentes em ação, acesse `/demo` na aplicação. Esta página contém exemplos interativos de todos os componentes de feedback disponíveis.

## 🔧 Troubleshooting

### Problemas Comuns

1. **Toast não aparece**: Verifique se o `Toaster` está incluído no App.js
2. **Loading não funciona**: Certifique-se de que o estado está sendo gerenciado corretamente
3. **Contexto não disponível**: Verifique se o componente está dentro do `FeedbackProvider`

### Dicas de Performance

1. Use `memo` para componentes de loading que renderizam frequentemente
2. Implemente debounce para ações que podem ser disparadas rapidamente
3. Use loading global apenas para operações que afetam toda a aplicação

## 📚 Recursos Adicionais

- Todos os componentes são acessíveis e seguem as práticas de acessibilidade
- Os componentes são responsivos e funcionam em dispositivos móveis
- O sistema é extensível e pode ser customizado conforme necessário
- Documentação de código disponível nos próprios arquivos dos componentes

---

Para mais informações, consulte os arquivos de código dos componentes ou a página de demonstração em `/demo`.
