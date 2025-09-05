import { useState, useEffect, useCallback, useMemo } from "react";
import { jobsApi } from "../services/jobsApi";

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [selectedModality, setSelectedModality] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedRepository, setSelectedRepository] = useState("");

  // Buscar todas as vagas
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobsApi.getJobs();
      setJobs(response.data);
    } catch (err) {
      setError("Erro ao carregar vagas. Tente novamente.");
      console.error("Erro ao buscar vagas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Aplicar filtros usando useMemo para otimização
  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.repository?.full_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por tecnologia
    if (selectedTech) {
      filtered = filtered.filter((job) =>
        job.labels.some((label) =>
          label.name.toLowerCase().includes(selectedTech.toLowerCase())
        )
      );
    }

    // Filtro por modalidade
    if (selectedModality) {
      filtered = filtered.filter((job) =>
        job.labels.some((label) =>
          label.name.toLowerCase().includes(selectedModality.toLowerCase())
        )
      );
    }

    // Filtro por nível
    if (selectedLevel) {
      filtered = filtered.filter((job) =>
        job.labels.some((label) =>
          label.name.toLowerCase().includes(selectedLevel.toLowerCase())
        )
      );
    }

    // Filtro por repositório
    if (selectedRepository) {
      filtered = filtered.filter((job) =>
        job.repository?.full_name
          .toLowerCase()
          .includes(selectedRepository.toLowerCase())
      );
    }

    return filtered;
  }, [
    jobs,
    searchTerm,
    selectedTech,
    selectedModality,
    selectedLevel,
    selectedRepository,
  ]);

  // Calcular estatísticas usando useMemo
  const stats = useMemo(() => {
    const total = filteredJobs.length;
    const remote = filteredJobs.filter((job) =>
      job.labels.some((label) => label.name.toLowerCase().includes("remoto"))
    ).length;
    const onsite = filteredJobs.filter((job) =>
      job.labels.some((label) =>
        label.name.toLowerCase().includes("presencial")
      )
    ).length;
    const hybrid = filteredJobs.filter((job) =>
      job.labels.some((label) => label.name.toLowerCase().includes("híbrido"))
    ).length;
    const junior = filteredJobs.filter((job) =>
      job.labels.some(
        (label) =>
          label.name.toLowerCase().includes("júnior") ||
          label.name.toLowerCase().includes("junior")
      )
    ).length;
    const mid = filteredJobs.filter((job) =>
      job.labels.some((label) => label.name.toLowerCase().includes("pleno"))
    ).length;
    const senior = filteredJobs.filter((job) =>
      job.labels.some(
        (label) =>
          label.name.toLowerCase().includes("sênior") ||
          label.name.toLowerCase().includes("senior")
      )
    ).length;

    return {
      total,
      remote,
      onsite,
      hybrid,
      junior,
      mid,
      senior,
    };
  }, [filteredJobs]);

  // Limpar filtros
  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedTech("");
    setSelectedModality("");
    setSelectedLevel("");
    setSelectedRepository("");
  }, []);

  // Carregar vagas na inicialização
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs: filteredJobs,
    allJobs: jobs,
    loading,
    error,
    stats,
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
    refetch: fetchJobs,
  };
};
