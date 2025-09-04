import axios from "axios";

const BASE_URL = "https://apibr.com/vagas/api/v2/";

// Instância do axios com configurações padrão
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Serviço para buscar vagas
export const jobsService = {
  // Buscar vagas com filtros
  async getJobs(params = {}) {
    try {
      const response = await api.get("issues", {
        params: {
          per_page: params.per_page || 50,
          page: params.page || 1,
          term: params.term || "",
          labels: params.labels || "",
          organizations: params.organizations || "",
          authors: params.authors || "",
          ...params,
        },
      });

      return {
        jobs: response.data,
        totalPages: parseInt(response.headers["x-total-pages"]) || 1,
        totalResults: parseInt(response.headers["x-total-results"]) || 0,
        currentPage: parseInt(response.headers["x-current-page"]) || 1,
        lastModified: response.headers["last-modified"],
        recentIssues: response.headers["x-last-60-days-count"],
        mostRecentIssue: response.headers["x-most-recent-date"],
      };
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
      throw new Error("Não foi possível carregar as vagas. Tente novamente.");
    }
  },

  // Buscar repositórios disponíveis
  async getRepositories() {
    try {
      const response = await api.get("repositories", {
        params: { per_page: 100 },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar repositórios:", error);
      return [];
    }
  },

  // Buscar autores/recrutadores
  async getAuthors() {
    try {
      const response = await api.get("authors", {
        params: { per_page: 100 },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar autores:", error);
      return [];
    }
  },
};

// Função utilitária para transformar dados da API para o formato do componente
export const transformJobData = (apiJob) => {
  const getModalityFromLabels = (labels) => {
    const modalityLabels = ["remoto", "presencial", "híbrido"];
    const found = labels?.find((label) =>
      modalityLabels.some((modality) =>
        label.name.toLowerCase().includes(modality)
      )
    );
    return found ? found.name : "Não especificado";
  };

  const getLevelFromLabels = (labels) => {
    const levelLabels = ["junior", "pleno", "senior", "estagio", "trainee"];
    const found = labels?.find((label) =>
      levelLabels.some((level) => label.name.toLowerCase().includes(level))
    );
    return found ? found.name : "Não especificado";
  };

  const getTechnologiesFromLabels = (labels) => {
    const techLabels = [
      "javascript",
      "react",
      "python",
      "java",
      "php",
      "node",
      "vue",
      "angular",
    ];
    return (
      labels
        ?.filter((label) =>
          techLabels.some((tech) => label.name.toLowerCase().includes(tech))
        )
        .map((label) => label.name) || []
    );
  };

  return {
    id: apiJob.id,
    title: apiJob.title,
    company: apiJob.repository?.organization?.login || "Empresa não informada",
    location: "Brasil", // A API não retorna localização específica
    salary: "A combinar", // A API não retorna salário
    type: "PJ", // Padrão para vagas brasileiras
    modality: getModalityFromLabels(apiJob.labels),
    level: getLevelFromLabels(apiJob.labels),
    description: apiJob.body || apiJob.title,
    technologies: getTechnologiesFromLabels(apiJob.labels),
    publishedAt: apiJob.created_at,
    url: apiJob.html_url,
    repository: apiJob.repository?.name,
    organization: apiJob.repository?.organization?.login,
    labels: apiJob.labels || [],
  };
};

export default api;
