import React from "react";
import { Link } from "react-router-dom";
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
  Star,
  Zap,
  Trophy,
} from "lucide-react";

const JobCard = ({ job }) => {
  // Log temporário para debug
  console.log("Job structure:", {
    id: job.id,
    number: job.number,
    title: job.title?.substring(0, 30) + "...",
  });

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
    <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-white to-emerald-50/30 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1">
      {/* Premium glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      {/* Premium border gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/50 via-teal-200/50 to-emerald-200/50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="text-emerald-500 transform rotate-12">
          <Zap className="h-full w-full" />
        </div>
      </div>

      <div className="relative z-10">
        <CardHeader className="pb-4">
          {/* Header with premium styling */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                {job.title}
              </CardTitle>

              {/* Company info with enhanced styling */}
              <div className="flex items-center gap-3 text-sm">
                <div className="relative">
                  <img
                    src={
                      job.repository?.organization?.avatar_url ||
                      job.user?.avatar_url
                    }
                    alt="Company Logo"
                    className="w-8 h-8 rounded-lg shadow-md border-2 border-white bg-gray-200 group-hover:shadow-lg transition-shadow duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-emerald-600 font-semibold text-base">
                    {job.repository?.organization?.login ||
                      job.repository?.full_name ||
                      "Empresa"}
                  </span>
                  <span className="text-gray-500 text-xs flex items-center">
                    <Github className="h-3 w-3 mr-1" />
                    {job.repository?.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Premium badges */}
            <div className="flex flex-col gap-2 items-end">
              <Badge
                className={`${getModalityColor(
                  modality
                )} font-semibold flex items-center gap-1.5 px-3 py-1 shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                {getModalityIcon(modality)}
                {modality}
              </Badge>

              {/* Premium indicator */}
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <Star className="h-3 w-3 fill-current" />
                Premium
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 px-6 pb-6">
          {/* Enhanced badges section */}
          <div className="flex flex-wrap gap-2">
            {level !== "Não informado" && (
              <Badge
                className={`${getLevelColor(
                  level
                )} text-xs font-semibold flex items-center gap-1 px-3 py-1.5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105`}
              >
                <Trophy className="h-3 w-3" />
                {level}
              </Badge>
            )}

            {techLabels.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/50 font-medium px-3 py-1.5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:from-blue-100 hover:to-indigo-100"
              >
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></span>
                {tech.name}
              </Badge>
            ))}
          </div>

          {/* Enhanced metadata section */}
          <div className="flex items-center justify-between text-sm bg-gray-50/50 rounded-lg p-3 group-hover:bg-emerald-50/50 transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-600 group-hover:text-emerald-600 transition-colors">
                <div className="p-1 bg-white rounded-md shadow-sm mr-2">
                  <Calendar className="h-4 w-4" />
                </div>
                <span className="font-medium">
                  {formatDate(job.created_at)}
                </span>
              </div>
              {job.comments > 0 && (
                <div className="flex items-center text-gray-600 group-hover:text-emerald-600 transition-colors">
                  <div className="p-1 bg-white rounded-md shadow-sm mr-2">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{job.comments}</span>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gradient-to-r from-emerald-200/30 via-teal-200/30 to-emerald-200/30">
            <div className="flex items-center text-xs text-gray-500">
              <div className="flex items-center bg-gray-100/50 rounded-full px-3 py-1.5">
                <User className="h-3 w-3 mr-1.5" />
                <span className="font-medium">{job.user?.login}</span>
                <span className="ml-2 text-emerald-600 font-semibold">
                  #{job.number}
                </span>
              </div>
            </div>

            <Link to={`/job/${job.number}`} className="inline-block">
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 px-4 py-2 font-semibold transform hover:scale-105 hover:-translate-y-0.5"
              >
                <ExternalLink className="h-4 w-4" />
                Ver Vaga
                <div className="absolute inset-0 bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default JobCard;
