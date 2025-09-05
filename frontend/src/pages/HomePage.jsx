import React, { useState, useEffect } from "react";
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
  Code,
  Terminal,
  Zap,
  Sparkles,
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

  // Estados para animações
  const [isVisible, setIsVisible] = useState(false);

  // Efeito para animação de entrada
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Componente de elementos flutuantes
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Elementos de código flutuantes */}
      <div className="absolute top-20 left-10 text-emerald-300/20 text-6xl font-mono animate-pulse">
        {"</>"}
      </div>
      <div className="absolute top-40 right-20 text-teal-300/20 text-4xl font-mono animate-bounce">
        {"{}"}
      </div>
      <div className="absolute bottom-40 left-1/4 text-emerald-400/20 text-5xl font-mono animate-pulse delay-1000">
        {"()"}
      </div>
      <div className="absolute top-60 left-3/4 text-teal-400/20 text-3xl font-mono animate-bounce delay-500">
        {"[]"}
      </div>

      {/* Círculos animados */}
      <div className="absolute top-32 right-1/3 w-20 h-20 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 left-1/3 w-32 h-32 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 rounded-full blur-xl animate-pulse delay-700"></div>

      {/* Linhas de código simuladas */}
      <div className="absolute top-1/4 left-0 w-40 h-1 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent animate-pulse"></div>
      <div className="absolute top-1/3 right-0 w-32 h-1 bg-gradient-to-r from-transparent via-teal-400/30 to-transparent animate-pulse delay-300"></div>
      <div className="absolute bottom-1/4 left-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent animate-pulse delay-600"></div>
    </div>
  );

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-300/70 via-emerald-100/80 to-teal-300/70">
      <Header />

      {/* Hero Section com efeitos avançados */}
      <section className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 text-white py-20 overflow-hidden">
        {/* Background animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/10 to-emerald-500/5"></div>

        {/* Elementos flutuantes */}
        <FloatingElements />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Título principal com animação */}
            <div
              className={`transition-all duration-1000 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="inline-block animate-pulse">
                  <Code className="inline h-12 w-12 md:h-16 md:w-16 mr-4 text-emerald-400" />
                </span>
                Encontre sua próxima
                <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x bg-300-percent mt-2">
                  oportunidade em tech
                </span>
              </h1>
            </div>

            {/* Subtítulo com delay */}
            <div
              className={`transition-all duration-1000 delay-300 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <p className="text-xl md:text-2xl mb-12 text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                <Terminal className="inline h-6 w-6 mr-2 text-emerald-400" />
                Conectamos desenvolvedores talentosos com as melhores empresas
                do Brasil
                <Sparkles className="inline h-5 w-5 ml-2 text-yellow-400 animate-pulse" />
              </p>
            </div>

            {/* Stats com animações */}
            <div
              className={`transition-all duration-1000 delay-500 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {/* Stat Card 1 */}
                <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <Briefcase className="h-10 w-10 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {stats.total}+
                  </div>
                  <div className="text-emerald-200 font-medium">
                    Vagas Disponíveis
                  </div>
                </div>

                {/* Stat Card 2 */}
                <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-teal-400/20 hover:border-teal-400/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <Zap className="h-10 w-10 text-teal-400 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full animate-ping delay-200"></div>
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                    {stats.remote}
                  </div>
                  <div className="text-teal-200 font-medium">Vagas Remotas</div>
                </div>

                {/* Stat Card 3 */}
                <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <TrendingUp className="h-10 w-10 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping delay-400"></div>
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {stats.senior}
                  </div>
                  <div className="text-emerald-200 font-medium">
                    Vagas Senior
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button com efeito especial */}
            <div
              className={`transition-all duration-1000 delay-700 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="mt-12">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Explorar Vagas
                    <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Efeito de ondas na parte inferior - curvatura para transição */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              fill="rgba(16, 185, 129, 0.8)"
            ></path>
          </svg>
        </div>
      </section>

      {/* Main Content com efeitos */}
      <section className="py-16 bg-gradient-to-br from-emerald-300/80 via-emerald-100/60 to-teal-300/80 relative overflow-hidden">
        {/* Curvatura na parte superior */}
        <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
          <svg
            className="relative block w-full h-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
           
          </svg>
        </div>
        {/* Elementos decorativos de background */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-500/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-teal-500/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar com efeitos */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 z-40 transform transition-all duration-300 hover:scale-105">
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
            </div>

            {/* Jobs List com animações */}
            <div className="lg:col-span-3">
              {/* Header da seção com efeitos */}
              <div className="mb-8 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <div className="flex items-center">
                    <div className="relative">
                      <Briefcase className="h-8 w-8 text-emerald-600 mr-3" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent">
                      {loading
                        ? "Carregando vagas..."
                        : `${jobs.length} vagas disponíveis`}
                    </h2>
                  </div>
                </div>
                <p className="text-slate-600 text-lg">
                  <Terminal className="inline h-5 w-5 mr-2 text-emerald-600" />
                  Encontre a oportunidade perfeita para sua carreira em tech
                  <Sparkles className="inline h-4 w-4 ml-2 text-yellow-500 animate-pulse" />
                </p>
              </div>

              {/* Loading State com efeitos especiais */}
              {loading && (
                <div className="text-center py-16">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6"></div>
                    <div
                      className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-teal-400 rounded-full animate-spin mx-auto"
                      style={{
                        animationDirection: "reverse",
                        animationDuration: "1.5s",
                      }}
                    ></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      <Code className="inline h-5 w-5 mr-2" />
                      Carregando vagas incríveis...
                    </h3>
                    <p className="text-slate-600">
                      <Terminal className="inline h-4 w-4 mr-2" />
                      Buscando as melhores oportunidades em tech para você
                    </p>
                  </div>

                  {/* Skeleton cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl p-6 shadow-sm border animate-pulse"
                      >
                        <div className="h-6 bg-slate-200 rounded mb-4"></div>
                        <div className="h-4 bg-slate-200 rounded mb-2"></div>
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error State melhorado */}
              {error && (
                <div className="text-center py-16">
                  <div className="relative inline-block mb-6">
                    <AlertCircle className="h-16 w-16 text-red-500 mx-auto animate-pulse" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800">
                      Ops! Algo deu errado
                    </h3>
                    <p className="text-slate-600 max-w-md mx-auto">{error}</p>
                    <button
                      onClick={refetch}
                      className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative flex items-center">
                        <Zap className="h-4 w-4 mr-2" />
                        Tentar novamente
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Empty State melhorado */}
              {!loading && !error && jobs.length === 0 && (
                <div className="text-center py-16">
                  <div className="relative inline-block mb-6">
                    <Search className="h-16 w-16 text-slate-400 mx-auto" />
                    <div className="absolute inset-0 animate-ping">
                      <Search className="h-16 w-16 text-emerald-400 mx-auto opacity-20" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800">
                      Nenhuma vaga encontrada
                    </h3>
                    <p className="text-slate-600 max-w-md mx-auto">
                      Tente ajustar seus filtros ou explore outras categorias
                    </p>
                    <button
                      onClick={clearFilters}
                      className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30"
                    >
                      <span className="flex items-center">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Limpar filtros
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Jobs Grid com animações */}
              {!loading && !error && jobs.length > 0 && (
                <>
                  {/* Informações da paginação melhoradas */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                      {jobs.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Briefcase className="h-4 w-4 text-emerald-600" />
                          <span className="font-medium">Itens por página:</span>
                          <select
                            value={jobsPerPage}
                            onChange={(e) => {
                              setJobsPerPage(Number(e.target.value));
                              setCurrentPage(1);
                            }}
                            className="border border-slate-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all duration-200 hover:border-emerald-400"
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
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Search className="h-4 w-4 text-teal-600" />
                          <span className="font-medium">
                            Página {currentPage} de {totalPages} •{" "}
                            <span className="text-emerald-600 font-semibold ml-1">
                              {startIndex + 1}-{Math.min(endIndex, jobs.length)}
                            </span>{" "}
                            de{" "}
                            <span className="text-emerald-600 font-semibold">
                              {jobs.length}
                            </span>{" "}
                            vagas
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Grid de vagas paginadas com animações */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {currentJobs.map((job, index) => (
                      <div
                        key={job.id}
                        className="transform transition-all duration-300 hover:scale-105"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: "fadeInUp 0.6s ease-out forwards",
                        }}
                      >
                        <JobCard job={job} />
                      </div>
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
