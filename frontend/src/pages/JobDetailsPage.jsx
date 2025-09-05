import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { EnhancedLoader } from "../components/LoadingComponents";
import { ErrorState } from "../components/FeedbackComponents";
import { useFeedback } from "../hooks/useFeedback";
import { jobsApi } from "../services/jobsApi";
import {
  Calendar,
  Building,
  ArrowLeft,
  User,
  ExternalLink,
  Github,
  MessageCircle,
  Home,
  Building2,
  Users,
  Laptop,
} from "lucide-react";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const feedback = useFeedback();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        console.log("Buscando vaga com ID da URL:", id);
        const jobData = await jobsApi.getJobById(id);
        console.log("Dados da vaga recebidos:", jobData);

        return jobData;
      } catch (err) {
        console.error("Erro completo ao buscar vaga:", err);
        throw new Error("Vaga não encontrada");
      }
    };

    if (id) {
      feedback
        .fetchData(fetchJob, {
          loadingMessage: "Carregando detalhes da vaga...",
          emptyMessage: "Vaga não encontrada",
          emptyCheck: (data) => !data,
        })
        .then((data) => {
          if (data) {
            setJob(data);
          }
        })
        .catch(() => {
          // Erro já tratado pelo useFeedback
        });
    }
  }, [id]); // Removido 'feedback' das dependências

  const handleRetry = () => {
    window.location.reload();
  };

  if (feedback.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <Header />
        <EnhancedLoader
          title="Carregando detalhes da vaga..."
          subtitle="Buscando informações completas para você"
        />
      </div>
    );
  }

  if (feedback.isError || feedback.isEmpty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <Header />
        <ErrorState
          title={
            feedback.isEmpty ? "Vaga não encontrada" : "Erro ao carregar vaga"
          }
          message={feedback.message}
          onRetry={handleRetry}
          retryText="Tentar novamente"
        />
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Data não informada";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Data inválida";
      }
      return date.toLocaleDateString("pt-BR");
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };

  const getModalityFromLabels = (labels) => {
    const modalityLabels =
      labels?.filter((label) =>
        ["Remoto", "Presencial", "Híbrido", "Alocado"].includes(label.name)
      ) || [];
    return modalityLabels.length > 0 ? modalityLabels[0].name : "Não informado";
  };

  const getLevelFromLabels = (labels) => {
    const levelLabels =
      labels?.filter((label) =>
        [
          "Júnior",
          "Pleno",
          "Sênior",
          "Senior",
          "Trainee",
          "Estágio",
          "Especialista",
        ].includes(label.name)
      ) || [];
    return levelLabels.length > 0 ? levelLabels[0].name : "Não informado";
  };

  const getTechFromLabels = (labels) => {
    const techLabels =
      labels?.filter((label) =>
        [
          "React",
          "Angular",
          "Vue.js",
          "Node.js",
          "Python",
          "Java",
          "JavaScript",
          "TypeScript",
          "PHP",
          "Ruby",
          "Go",
        ].includes(label.name)
      ) || [];
    return techLabels;
  };

  const getModalityColor = (modality) => {
    const modalityLower = modality.toLowerCase();
    if (modalityLower.includes("remoto"))
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (modalityLower.includes("presencial"))
      return "bg-orange-100 text-orange-800 border-orange-200";
    if (modalityLower.includes("híbrido") || modalityLower.includes("hibrido"))
      return "bg-purple-100 text-purple-800 border-purple-200";
    if (modalityLower.includes("alocado"))
      return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getLevelColor = (level) => {
    const levelLower = level.toLowerCase();
    if (
      levelLower.includes("junior") ||
      levelLower.includes("júnior") ||
      levelLower.includes("estagio") ||
      levelLower.includes("trainee")
    )
      return "bg-green-100 text-green-800 border-green-200";
    if (levelLower.includes("pleno"))
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (levelLower.includes("senior") || levelLower.includes("sênior"))
      return "bg-red-100 text-red-800 border-red-200";
    if (levelLower.includes("especialista"))
      return "bg-violet-100 text-violet-800 border-violet-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getModalityIcon = (modality) => {
    const modalityLower = modality.toLowerCase();
    if (modalityLower.includes("remoto")) return <Home className="h-4 w-4" />;
    if (modalityLower.includes("presencial"))
      return <Building2 className="h-4 w-4" />;
    if (modalityLower.includes("híbrido") || modalityLower.includes("hibrido"))
      return <Users className="h-4 w-4" />;
    return <Laptop className="h-4 w-4" />;
  };

  // Verificação de segurança antes de acessar job.labels
  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          {feedback.loading && <EnhancedLoader />}
          {feedback.error && (
            <ErrorState
              title="Erro ao carregar vaga"
              description={feedback.error}
              onRetry={() => window.location.reload()}
            />
          )}
        </div>
      </div>
    );
  }

  const modality = getModalityFromLabels(job.labels);
  const level = getLevelFromLabels(job.labels);
  const techLabels = getTechFromLabels(job.labels);

  const handleApplyToJob = () => {
    console.log("Candidatando-se à vaga:", job.title);

    if (!job) {
      toast({
        title: "Erro",
        description: "Dados da vaga não encontrados",
        variant: "destructive",
      });
      return;
    }

    // Construir URL da vaga
    const finalUrl =
      job.html_url ||
      job.url ||
      `https://github.com/backend-br/vagas/issues/${job.number}`;

    console.log("Abrindo vaga:", finalUrl);

    if (finalUrl && finalUrl !== "undefined") {
      try {
        // Criar um link temporário e clicar nele (evita popup blocker)
        const link = document.createElement("a");
        link.href = finalUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
          title: "Redirecionando...",
          description: "Abrindo a vaga no GitHub para você se candidatar!",
        });
      } catch (error) {
        console.error("Erro ao abrir URL:", error);
        toast({
          title: "Erro",
          description: "Não foi possível abrir a vaga. Tente novamente.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "URL não disponível",
        description:
          "Não foi possível encontrar o link da vaga. Verifique diretamente no repositório backend-br/vagas.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <div className="mb-6">
          <button
            onClick={() => {
              console.log("Navegando para home...");
              navigate("/");
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "10px 20px",
              fontSize: "15px",
              fontWeight: "500",
              color: "#059669",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(16, 185, 129, 0.2)";
              e.target.style.borderColor = "rgba(16, 185, 129, 0.5)";
              e.target.style.color = "#047857";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(16, 185, 129, 0.1)";
              e.target.style.borderColor = "rgba(16, 185, 129, 0.3)";
              e.target.style.color = "#059669";
              e.target.style.transform = "translateY(0px)";
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para vagas
          </button>
        </div>

        {/* Card Principal da Vaga */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {job.title || "Título não informado"}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm">
                  {(job.repository?.organization?.avatar_url ||
                    job.user?.avatar_url) && (
                    <img
                      src={
                        job.repository?.organization?.avatar_url ||
                        job.user?.avatar_url
                      }
                      alt="Company Logo"
                      className="w-8 h-8 rounded-full bg-gray-200"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                  <span className="text-emerald-600 font-medium text-lg">
                    {job.repository?.organization?.login ||
                      job.repository?.full_name ||
                      job.user?.login ||
                      "Empresa não informada"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Badge
                  className={`${getModalityColor(
                    modality
                  )} font-medium flex items-center gap-1`}
                >
                  {getModalityIcon(modality)}
                  {modality}
                </Badge>
                {level !== "Não informado" && (
                  <Badge className={`${getLevelColor(level)}`}>
                    <User className="h-3 w-3 mr-1" />
                    {level}
                  </Badge>
                )}
              </div>
            </div>

            {/* Tecnologias */}
            {techLabels.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {techLabels.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {tech.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Informações da vaga */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Publicada em {formatDate(job.created_at)}
              </div>
              {job.comments && job.comments > 0 && (
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {job.comments} comentários
                </div>
              )}
              {job.repository?.name && (
                <div className="flex items-center">
                  <Github className="h-4 w-4 mr-1" />
                  {job.repository.name}
                </div>
              )}
              {job.user?.login && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Por {job.user.login}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {/* Descrição da vaga */}
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Descrição da vaga
              </h3>
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {job.body || "Descrição não disponível"}
              </div>
            </div>

            {/* Informações da vaga */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Vaga #{job.number} •{" "}
                {job.state === "closed" ? "Fechada" : "Aberta"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão de Candidatura - FORA DO CARD */}
        <div className="mb-6 text-center">
          <button
            onClick={() => {
              console.log("🚀 Candidatando-se à vaga!");
              handleApplyToJob();
            }}
            disabled={job.state === "closed"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "12px 32px",
              fontSize: "18px",
              fontWeight: "600",
              color: "white",
              background:
                job.state === "closed"
                  ? "linear-gradient(to right, #9ca3af, #6b7280)"
                  : "linear-gradient(to right, #10b981, #14b8a6)",
              border: "none",
              borderRadius: "8px",
              cursor: job.state === "closed" ? "not-allowed" : "pointer",
              boxShadow:
                "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
              transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              opacity: job.state === "closed" ? 0.6 : 1,
              pointerEvents: "auto",
              position: "relative",
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              if (job.state !== "closed") {
                e.target.style.background =
                  "linear-gradient(to right, #059669, #0d9488)";
                e.target.style.boxShadow =
                  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
                e.target.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (job.state !== "closed") {
                e.target.style.background =
                  "linear-gradient(to right, #10b981, #14b8a6)";
                e.target.style.boxShadow =
                  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
                e.target.style.transform = "translateY(0px)";
              }
            }}
          >
            <ExternalLink className="h-5 w-5" />
            {job.state === "closed" ? "Vaga fechada" : "Candidatar-se à vaga"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
