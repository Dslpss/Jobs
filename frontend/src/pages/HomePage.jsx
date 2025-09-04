import React, { useState } from "react";
import Header from "../components/Header";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";
import { useJobs } from "../hooks/useJobs";
import {
  Search,
  Briefcase,
  TrendingUp,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const JOBS_PER_PAGE_OPTIONS = [12, 24, 48];

const HomePage = () => {
  const {
    jobs,
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
    refetch,
  } = useJobs();

  // Estados da paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(JOBS_PER_PAGE_OPTIONS[0]);

  // Calcular dados da paginação
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  // Funções da paginação
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Resetar página quando filtros ou itens por página mudarem
  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedTech,
    selectedModality,
    selectedLevel,
    selectedRepository,
    jobsPerPage,
  ]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Encontre sua próxima
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                oportunidade em tech
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto">
              Conectamos desenvolvedores talentosos com as melhores empresas do
              Brasil
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Briefcase className="h-8 w-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold">{stats.total}+</div>
                <div className="text-emerald-200">Vagas Disponíveis</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Search className="h-8 w-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold">{stats.remote}</div>
                <div className="text-emerald-200">Vagas Remotas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold">{stats.senior}</div>
                <div className="text-emerald-200">Vagas Senior</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <JobFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedTech={selectedTech}
                setSelectedTech={setSelectedTech}
                selectedModality={selectedModality}
                setSelectedModality={setSelectedModality}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                selectedRepository={selectedRepository}
                setSelectedRepository={setSelectedRepository}
                clearFilters={clearFilters}
                stats={stats}
              />
            </div>

            {/* Jobs List */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {loading
                    ? "Carregando..."
                    : `${jobs.length} vagas disponíveis`}
                </h2>
                <p className="text-gray-600">
                  Encontre a oportunidade perfeita para sua carreira
                </p>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 text-emerald-600 mx-auto mb-4 animate-spin" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Carregando vagas...
                  </h3>
                  <p className="text-gray-600">
                    Buscando as melhores oportunidades para você
                  </p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Erro ao carregar vagas
                  </h3>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button
                    onClick={refetch}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Tentar novamente
                  </button>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && jobs.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhuma vaga encontrada
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Tente ajustar seus filtros ou fazer uma nova busca
                  </p>
                </div>
              )}

              {/* Jobs Grid */}
              {!loading && !error && jobs.length > 0 && (
                <>
                  {/* Informações da paginação */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                      {jobs.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>Itens por página:</span>
                          <select
                            value={jobsPerPage}
                            onChange={(e) => {
                              setJobsPerPage(Number(e.target.value));
                              setCurrentPage(1);
                            }}
                            className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          >
                            {JOBS_PER_PAGE_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      {jobs.length > 0 && (
                        <span className="text-sm text-gray-600">
                          Página {currentPage} de {totalPages} • Mostrando{" "}
                          {startIndex + 1}-{Math.min(endIndex, jobs.length)} de{" "}
                          {jobs.length} vagas
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Grid de vagas paginadas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {currentJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>

                  {/* Paginação */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                      {/* Botão Anterior */}
                      <button
                        onClick={goToPrevious}
                        disabled={currentPage === 1}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          currentPage === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Anterior
                      </button>

                      {/* Números das páginas */}
                      <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, index) => {
                          const page = index + 1;
                          const isCurrentPage = page === currentPage;

                          // Mostrar apenas algumas páginas ao redor da atual
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 2 && page <= currentPage + 2)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                  isCurrentPage
                                    ? "bg-emerald-600 text-white"
                                    : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (
                            page === currentPage - 3 ||
                            page === currentPage + 3
                          ) {
                            return (
                              <span
                                key={page}
                                className="px-2 py-2 text-sm text-gray-400"
                              >
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>

                      {/* Botão Próximo */}
                      <button
                        onClick={goToNext}
                        disabled={currentPage === totalPages}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          currentPage === totalPages
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        Próximo
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
