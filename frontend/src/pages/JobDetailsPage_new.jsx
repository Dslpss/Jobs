import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { jobsApi } from "../services/jobsApi";
import {
  Calendar,
  ArrowLeft,
  User,
  ExternalLink,
  Github,
  MessageCircle,
  Loader2,
  Home,
  Building2,
  Users,
  Laptop,
} from "lucide-react";

const JobDetailsPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const jobData = await jobsApi.getJobById(id);
        if (jobData) {
          setJob(jobData);
        } else {
          setError("Vaga não encontrada");
        }
      } catch (err) {
        setError("Erro ao carregar a vaga");
        console.error("Erro ao buscar vaga:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
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

  const handleApplyToJob = () => {
    if (job.html_url) {
      window.open(job.html_url, "_blank", "noopener,noreferrer");
    } else {
      toast({
        title: "Link não disponível",
        description: "O link para esta vaga não está disponível no momento.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
            <span className="text-gray-600">Carregando vaga...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="text-center py-12">
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {error || "Vaga não encontrada"}
              </h2>
              <p className="text-gray-600 mb-4">
                A vaga que você está procurando não existe ou foi removida.
              </p>
              <Link to="/">
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar para vagas
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const modality = getModalityFromLabels(job.labels);
  const level = getLevelFromLabels(job.labels);
  const techLabels = getTechFromLabels(job.labels);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <div className="mb-6">
          <Link to="/">
            <Button
              variant="ghost"
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para vagas
            </Button>
          </Link>
        </div>

        {/* Card Principal da Vaga */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {job.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm">
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
                  <span className="text-emerald-600 font-medium text-lg">
                    {job.repository?.organization?.login ||
                      job.repository?.full_name ||
                      "Empresa"}
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
              {job.comments > 0 && (
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {job.comments} comentários
                </div>
              )}
              <div className="flex items-center">
                <Github className="h-4 w-4 mr-1" />
                {job.repository?.name}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                Por {job.user?.login}
              </div>
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

            {/* Botão de candidatura */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Vaga #{job.number} •{" "}
                  {job.state === "open" ? "Aberta" : "Fechada"}
                </div>
                <Button
                  onClick={handleApplyToJob}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={job.state !== "open"}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {job.state === "open"
                    ? "Candidatar-se à vaga"
                    : "Vaga fechada"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDetailsPage;
