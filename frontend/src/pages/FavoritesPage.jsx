import React, { useState } from "react";
import Header from "../components/Header";
import JobCard from "../components/JobCard";
import { useFavorites } from "../contexts/FavoritesContext";
import { EmptyState } from "../components/FeedbackComponents";
import { Heart, Briefcase } from "lucide-react";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  // Paginação
  const totalPages = Math.ceil(favorites.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentFavorites = favorites.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (favorites.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <EmptyState
                icon={Heart}
                title="Nenhuma vaga favorita ainda"
                message="Comece explorando vagas e marcando as que mais te interessam como favoritas."
                actionText="Explorar Vagas"
                actionLink="/"
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header da página */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Vagas Favoritas
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Você tem {favorites.length} vaga
              {favorites.length !== 1 ? "s" : ""} salva
              {favorites.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Grid de vagas favoritas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentFavorites.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      page === currentPage
                        ? "bg-blue-600 text-white"
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Próximo
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
