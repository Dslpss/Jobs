import { useState, useEffect, useCallback } from "react";
import { jobsApi } from "../services/jobsApi";

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [selectedModality, setSelectedModality] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedRepository, setSelectedRepository] = useState("");

  // Estatísticas
  const [stats, setStats] = useState({
    total: 0,
    remote: 0,
    onsite: 0,
    hybrid: 0,
    junior: 0,
    mid: 0,
    senior: 0,
  });

  // Buscar todas as vagas
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobsApi.getJobs();
      setJobs(response.data);
      setFilteredJobs(response.data);
      calculateStats(response.data);
    } catch (err) {
      setError("Erro ao carregar vagas. Tente novamente.");
      console.error("Erro ao buscar vagas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Calcular estatísticas
  const calculateStats = (jobsList) => {
    const total = jobsList.length;
    const remote = jobsList.filter((job) =>
      job.labels.some((label) => label.name.toLowerCase().includes("remoto"))
    ).length;
    const onsite = jobsList.filter((job) =>
      job.labels.some((label) =>
        label.name.toLowerCase().includes("presencial")
      )
    ).length;
    const hybrid = jobsList.filter((job) =>
      job.labels.some((label) => label.name.toLowerCase().includes("híbrido"))
    ).length;
    const junior = jobsList.filter((job) =>
      job.labels.some(
        (label) =>
          label.name.toLowerCase().includes("júnior") ||
          label.name.toLowerCase().includes("junior")
      )
    ).length;
    const mid = jobsList.filter((job) =>
      job.labels.some((label) => label.name.toLowerCase().includes("pleno"))
    ).length;
    const senior = jobsList.filter((job) =>
      job.labels.some(
        (label) =>
          label.name.toLowerCase().includes("sênior") ||
          label.name.toLowerCase().includes("senior")
      )
    ).length;

    setStats({
      total,
      remote,
      onsite,
      hybrid,
      junior,
      mid,
      senior,
    });
  };

  // Aplicar filtros
  const applyFilters = useCallback(() => {
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

    setFilteredJobs(filtered);
    calculateStats(filtered);
  }, [
    jobs,
    searchTerm,
    selectedTech,
    selectedModality,
    selectedLevel,
    selectedRepository,
  ]);

  // Limpar filtros
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTech("");
    setSelectedModality("");
    setSelectedLevel("");
    setSelectedRepository("");
    setFilteredJobs(jobs);
    calculateStats(jobs);
  };

  // Efeito para aplicar filtros quando mudarem
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

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
