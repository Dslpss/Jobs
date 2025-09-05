import React, { useState, useEffect, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SelectItem } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import SafeSelect from "./SafeSelect";
import useDebounce from "../hooks/useDebounce";
import {
  Search,
  Filter,
  X,
  Code2,
  MapPin,
  TrendingUp,
  Folder,
  Sparkles,
} from "lucide-react";

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
  // Estado local para o input de busca para evitar lag na digitação
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce do termo de busca para evitar muitas re-renderizações
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  // Atualiza o searchTerm pai quando o debounced value muda
  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  // Sincroniza quando o searchTerm pai muda externamente (ex: clearFilters)
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const hasActiveFilters =
    selectedTech ||
    selectedModality ||
    selectedLevel ||
    selectedRepository ||
    searchTerm;

  return (
    <Card className="bg-gradient-to-br from-white/80 via-white/90 to-emerald-50/80 backdrop-blur-xl border-emerald-200/50 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 group">
      <CardHeader className="pb-6 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-2 right-4 text-emerald-500">
            <Code2 className="h-8 w-8 rotate-12" />
          </div>
          <div className="absolute bottom-2 left-4 text-teal-500">
            <Sparkles className="h-6 w-6 -rotate-12" />
          </div>
        </div>

        <div className="flex items-center justify-between relative z-10">
          <CardTitle className="text-xl font-bold flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg mr-3 shadow-lg">
              <Filter className="h-5 w-5 text-white" />
            </div>
            Filtros Avançados
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all duration-300 rounded-xl shadow-lg hover:shadow-red-500/30"
            >
              <X className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        {/* Search com efeitos especiais */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-500"></div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500 z-10" />
            <Input
              placeholder="🔍 Buscar vagas incríveis..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="pl-12 h-12 border-2 border-emerald-200/50 focus:border-emerald-400 focus:ring-emerald-400/30 bg-white/90 backdrop-blur-sm rounded-xl text-base font-medium placeholder:text-gray-400 transition-all duration-300 hover:shadow-lg focus:shadow-emerald-500/20"
            />
          </div>
        </div>

        {/* Technology Filter com ícone */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 mb-2 flex items-center">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg mr-2 shadow-sm">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            Tecnologia
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
            <SafeSelect
              value={selectedTech}
              onValueChange={setSelectedTech}
              placeholder="💻 Selecione uma tecnologia"
              triggerClassName="relative h-11 border-2 border-blue-200/50 focus:border-blue-400 bg-white/90 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-300"
              contentClassName="bg-white/95 backdrop-blur-xl border-blue-200/50 shadow-xl"
            >
              {technologies.map((tech) => (
                <SelectItem
                  key={tech}
                  value={tech}
                  className="hover:bg-blue-50/80 focus:bg-blue-100/80 transition-colors"
                >
                  {tech}
                </SelectItem>
              ))}
            </SafeSelect>
          </div>
        </div>

        {/* Modality Filter com ícone */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 mb-2 flex items-center">
            <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mr-2 shadow-sm">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            Modalidade
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
            <SafeSelect
              value={selectedModality}
              onValueChange={setSelectedModality}
              placeholder="🏠 Selecione uma modalidade"
              triggerClassName="relative h-11 border-2 border-purple-200/50 focus:border-purple-400 bg-white/90 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-300"
              contentClassName="bg-white/95 backdrop-blur-xl border-purple-200/50 shadow-xl"
            >
              {modalities.map((modality) => (
                <SelectItem
                  key={modality}
                  value={modality}
                  className="hover:bg-purple-50/80 focus:bg-purple-100/80 transition-colors"
                >
                  {modality}
                </SelectItem>
              ))}
            </SafeSelect>
          </div>
        </div>

        {/* Level Filter com ícone */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 mb-2 flex items-center">
            <div className="p-1.5 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mr-2 shadow-sm">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            Nível
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
            <SafeSelect
              value={selectedLevel}
              onValueChange={setSelectedLevel}
              placeholder="📈 Selecione um nível"
              triggerClassName="relative h-11 border-2 border-orange-200/50 focus:border-orange-400 bg-white/90 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-300"
              contentClassName="bg-white/95 backdrop-blur-xl border-orange-200/50 shadow-xl"
            >
              {levels.map((level) => (
                <SelectItem
                  key={level}
                  value={level}
                  className="hover:bg-orange-50/80 focus:bg-orange-100/80 transition-colors"
                >
                  {level}
                </SelectItem>
              ))}
            </SafeSelect>
          </div>
        </div>

        {/* Repository Filter com ícone */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700 mb-2 flex items-center">
            <div className="p-1.5 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg mr-2 shadow-sm">
              <Folder className="h-4 w-4 text-white" />
            </div>
            Repositório
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
            <SafeSelect
              value={selectedRepository}
              onValueChange={setSelectedRepository}
              placeholder="📁 Selecione um repositório"
              triggerClassName="relative h-11 border-2 border-teal-200/50 focus:border-teal-400 bg-white/90 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-300"
              contentClassName="bg-white/95 backdrop-blur-xl border-teal-200/50 shadow-xl"
            >
              {repositories.map((repo) => (
                <SelectItem
                  key={repo}
                  value={repo}
                  className="hover:bg-teal-50/80 focus:bg-teal-100/80 transition-colors"
                >
                  {repo}
                </SelectItem>
              ))}
            </SafeSelect>
          </div>
        </div>

        {/* Active Filters com design melhorado */}
        {hasActiveFilters && (
          <div className="pt-6 border-t border-gradient-to-r from-emerald-200/50 via-teal-200/50 to-emerald-200/50 relative">
            {/* Background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 via-teal-50/30 to-emerald-50/30 rounded-lg"></div>

            <div className="relative z-10">
              <p className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-emerald-500" />
                Filtros Ativos:
              </p>
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300 px-3 py-1 rounded-full font-medium"
                  >
                    🔍 {searchTerm}
                  </Badge>
                )}
                {selectedTech && (
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300 px-3 py-1 rounded-full font-medium"
                  >
                    💻 {selectedTech}
                  </Badge>
                )}
                {selectedModality && (
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300 px-3 py-1 rounded-full font-medium"
                  >
                    🏠 {selectedModality}
                  </Badge>
                )}
                {selectedLevel && (
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border border-orange-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300 px-3 py-1 rounded-full font-medium"
                  >
                    📈 {selectedLevel}
                  </Badge>
                )}
                {selectedRepository && (
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 border border-teal-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300 px-3 py-1 rounded-full font-medium"
                  >
                    📁 {selectedRepository}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(JobFilters);
