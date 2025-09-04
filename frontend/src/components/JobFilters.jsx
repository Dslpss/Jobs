import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Search, Filter, X } from "lucide-react";

// Dados de filtros extraídos da API
const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "C#",
  "PHP",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
];

const modalities = ["Remoto", "Presencial", "Híbrido"];
const levels = ["Júnior", "Pleno", "Sênior", "Staff"];
const repositories = ["backend", "frontend", "mobile", "devops", "data"];

const JobFilters = ({
  searchTerm,
  setSearchTerm,
  selectedTech,
  setSelectedTech,
  selectedModality,
  setSelectedModality,
  selectedLevel,
  setSelectedLevel,
  selectedRepository,
  setSelectedRepository,
  clearFilters,
  stats,
}) => {
  const hasActiveFilters =
    selectedTech ||
    selectedModality ||
    selectedLevel ||
    selectedRepository ||
    searchTerm;

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Filter className="h-5 w-5 mr-2 text-emerald-600" />
            Filtros
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar vagas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
          />
        </div>

        {/* Technology Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Tecnologia
          </label>
          <Select value={selectedTech} onValueChange={setSelectedTech}>
            <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
              <SelectValue placeholder="Selecione uma tecnologia" />
            </SelectTrigger>
            <SelectContent>
              {technologies.map((tech) => (
                <SelectItem key={tech} value={tech}>
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Modality Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Modalidade
          </label>
          <Select value={selectedModality} onValueChange={setSelectedModality}>
            <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
              <SelectValue placeholder="Selecione uma modalidade" />
            </SelectTrigger>
            <SelectContent>
              {modalities.map((modality) => (
                <SelectItem key={modality} value={modality}>
                  {modality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Level Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Nível
          </label>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
              <SelectValue placeholder="Selecione um nível" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Repository Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Repositório
          </label>
          <Select
            value={selectedRepository}
            onValueChange={setSelectedRepository}
          >
            <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
              <SelectValue placeholder="Selecione um repositório" />
            </SelectTrigger>
            <SelectContent>
              {repositories.map((repo) => (
                <SelectItem key={repo} value={repo}>
                  {repo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Filtros ativos:
            </p>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800"
                >
                  Busca: {searchTerm}
                </Badge>
              )}
              {selectedTech && (
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800"
                >
                  {selectedTech}
                </Badge>
              )}
              {selectedModality && (
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800"
                >
                  {selectedModality}
                </Badge>
              )}
              {selectedLevel && (
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800"
                >
                  {selectedLevel}
                </Badge>
              )}
              {selectedRepository && (
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800"
                >
                  {selectedRepository}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobFilters;
