// Teste rápido da API
const axios = require("axios");

const api = axios.create({
  baseURL: "https://apibr.com/vagas/api/v2",
  timeout: 10000,
});

async function testAPI() {
  try {
    console.log("Testando API...");
    const response = await api.get("/issues");
    const firstJob = response.data[0];

    console.log("Total de vagas:", response.data.length);
    console.log("Primeira vaga:");
    console.log("ID:", firstJob.id);
    console.log("Number:", firstJob.number);
    console.log("Title:", firstJob.title);
    console.log("Created at:", firstJob.created_at);
    console.log("User:", firstJob.user);
    console.log("Repository:", firstJob.repository);
    console.log(
      "Body:",
      firstJob.body ? firstJob.body.substring(0, 100) + "..." : "Sem body"
    );
    console.log("Labels:", firstJob.labels?.map((l) => l.name).join(", "));
    console.log("URL:", firstJob.url);
    console.log("HTML URL:", firstJob.html_url);
    console.log("Todos os campos:", Object.keys(firstJob));
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

testAPI();
