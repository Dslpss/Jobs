import React from "react";
import { Button } from "./ui/button";
import { useFavorites } from "../contexts/FavoritesContext";

const FavoriteButton = ({ job, size = "sm", variant = "ghost" }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(job);
  };

  const isFav = isFavorite(job.id);

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`transition-colors ${
        isFav
          ? "text-red-500 hover:text-red-600"
          : "text-gray-400 hover:text-red-400"
      }`}
      title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <svg
        className={`w-5 h-5 ${isFav ? "fill-current" : ""}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
};

export default FavoriteButton;
