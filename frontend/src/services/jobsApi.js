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
      // Primeiro, fazer uma chamada simples
      let response = await api.get("/issues", { params });
      let allJobs = [...response.data];

      // Log para verificar a estrutura dos dados
      console.log("Estrutura da primeira vaga:", allJobs[0]);
      console.log("Campos disponíveis:", Object.keys(allJobs[0] || {}));

      // Verificar se há mais páginas (comum em APIs REST)
      // Tentar buscar com parâmetros de paginação
      const paginationParams = [
        { page: 1, per_page: 100 },
        { page: 2, per_page: 100 },
        { page: 3, per_page: 100 },
      ];

      for (const pageParam of paginationParams) {
        try {
          const pageResponse = await api.get("/issues", {
            params: { ...params, ...pageParam },
          });

          // Se retornou dados diferentes da primeira chamada, adicionar
          if (pageResponse.data && pageResponse.data.length > 0) {
            const newJobs = pageResponse.data.filter(
              (job) => !allJobs.some((existingJob) => existingJob.id === job.id)
            );
            allJobs = [...allJobs, ...newJobs];
          }
        } catch (pageError) {
          // Se der erro na paginação, continuar com os dados que já temos
          console.log(
            `Página ${pageParam.page} não disponível:`,
            pageError.message
          );
        }
      }

      console.log(`Total de vagas carregadas: ${allJobs.length}`);

      return {
        data: allJobs,
        total: allJobs.length,
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

  // Buscar vaga por ID
  async getJobById(id) {
    try {
      console.log("Buscando vaga com ID:", id);

      // A API sempre retorna um array, mesmo para busca específica
      // Vamos buscar todas e filtrar pelo número ou ID
      const allJobsResponse = await api.get("/issues");
      console.log("Total de vagas disponíveis:", allJobsResponse.data.length);

      const job = allJobsResponse.data.find((job) => {
        const match = job.number === parseInt(id) || job.id === parseInt(id);
        if (match) {
          console.log(
            "Vaga encontrada:",
            job.title,
            "- Number:",
            job.number,
            "- ID:",
            job.id
          );
          console.log("Estrutura da vaga encontrada:", {
            id: job.id,
            number: job.number,
            title: job.title,
            created_at: job.created_at,
            user: job.user?.login,
            repository: job.repository?.full_name,
            url: job.url,
            body: job.body ? "Tem descrição" : "Sem descrição",
          });
        }
        return match;
      });

      if (!job) {
        console.log("Nenhuma vaga encontrada com ID/number:", id);
        // Vamos mostrar alguns exemplos de IDs disponíveis
        const examples = allJobsResponse.data.slice(0, 3).map((j) => ({
          id: j.id,
          number: j.number,
          title: j.title?.substring(0, 50) + "...",
        }));
        console.log("Exemplos de vagas disponíveis:", examples);
        throw new Error("Vaga não encontrada");
      }

      return job;
    } catch (error) {
      console.error("Erro ao buscar vaga por ID:", error);
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
