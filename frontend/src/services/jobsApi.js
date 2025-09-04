import axios from "axios";

const API_BASE_URL = "https://apibr.com/vagas/api/v2";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const jobsApi = {
  // Buscar todas as vagas
  async getJobs(params = {}) {
    try {
      const response = await api.get("/issues", { params });
      return {
        data: response.data,
        total: response.data.length,
      };
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
      throw error;
    }
  },

  // Buscar vaga por ID
  async getJobById(id) {
    try {
      const response = await api.get("/issues");
      const job = response.data.find((job) => job.id === parseInt(id));
      return job;
    } catch (error) {
      console.error("Erro ao buscar vaga:", error);
      throw error;
    }
  },

  // Filtrar vagas por tecnologia
  async getJobsByTech(tech) {
    try {
      const response = await api.get("/issues");
      return response.data.filter((job) =>
        job.labels.some((label) =>
          label.name.toLowerCase().includes(tech.toLowerCase())
        )
      );
    } catch (error) {
      console.error("Erro ao filtrar vagas por tecnologia:", error);
      throw error;
    }
  },

  // Filtrar vagas por modalidade (remoto, presencial, híbrido)
  async getJobsByModality(modality) {
    try {
      const response = await api.get("/issues");
      return response.data.filter((job) =>
        job.labels.some((label) =>
          label.name.toLowerCase().includes(modality.toLowerCase())
        )
      );
    } catch (error) {
      console.error("Erro ao filtrar vagas por modalidade:", error);
      throw error;
    }
  },

  // Filtrar vagas por nível (júnior, pleno, sênior)
  async getJobsByLevel(level) {
    try {
      const response = await api.get("/issues");
      return response.data.filter((job) =>
        job.labels.some((label) =>
          label.name.toLowerCase().includes(level.toLowerCase())
        )
      );
    } catch (error) {
      console.error("Erro ao filtrar vagas por nível:", error);
      throw error;
    }
  },

  // Buscar por palavra-chave no título
  async searchJobs(query) {
    try {
      const response = await api.get("/issues");
      return response.data.filter((job) =>
        job.title.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
      throw error;
    }
  },
};

export default jobsApi;
