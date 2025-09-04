import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  MapPin,
  Calendar,
  ExternalLink,
  Clock,
  Building2,
  MessageCircle,
  User,
  Github,
  Laptop,
  Home,
  Users,
  Lock,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const handleViewJob = () => {
    if (!isAuthenticated) {
      // Redirecionar para login, salvando a intenção de ver esta vaga
      navigate("/login", {
        state: {
          from: { pathname: `/job/${job.id}` },
          jobUrl: job.html_url,
        },
      });
    } else {
      // Se estiver logado, abrir a vaga diretamente
      window.open(job.html_url, "_blank", "noopener,noreferrer");
    }
  };

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
    return techLabels.slice(0, 3); // Limite de 3 tecnologias
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

  const modality = getModalityFromLabels(job.labels);
  const level = getLevelFromLabels(job.labels);
  const techLabels = getTechFromLabels(job.labels);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {job.title}
          </CardTitle>
          <div className="flex gap-2">
            <Badge
              className={`${getModalityColor(
                modality
              )} font-medium flex items-center gap-1`}
            >
              {getModalityIcon(modality)}
              {modality}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <img
            src={
              job.repository?.organization?.avatar_url || job.user?.avatar_url
            }
            alt="Company Logo"
            className="w-6 h-6 rounded-full bg-gray-200"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <span className="text-emerald-600 font-medium">
            {job.repository?.organization?.login ||
              job.repository?.full_name ||
              "Empresa"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {level !== "Não informado" && (
            <Badge className={`${getLevelColor(level)} text-xs`}>
              <User className="h-3 w-3 mr-1" />
              {level}
            </Badge>
          )}

          {techLabels.map((tech, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-blue-50 text-blue-700 border-blue-200"
            >
              {tech.name}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(job.created_at)}
            </div>
            {job.comments > 0 && (
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-1" />
                {job.comments}
              </div>
            )}
          </div>
          <div className="flex items-center">
            <Github className="h-4 w-4 mr-1" />
            {job.repository?.name}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <User className="h-3 w-3 mr-1" />
            {job.user?.login}
            <span className="ml-2 text-gray-400">#{job.number}</span>
          </div>

          <Button
            onClick={handleViewJob}
            size="sm"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1"
          >
            {isAuthenticated ? (
              <>
                <ExternalLink className="h-3 w-3" />
                Ver vaga
              </>
            ) : (
              <>
                <Lock className="h-3 w-3" />
                Fazer login para ver
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
