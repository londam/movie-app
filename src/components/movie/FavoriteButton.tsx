"use client";
import { RootState } from "@/store";
import { addFavorite, removeFavorite } from "@/store/slices/favoritesSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { TMDBMovie } from "@/types/tmdb";

interface FavoriteButtonProps {
  movie: TMDBMovie;
  small?: boolean;
}

const FavoriteButton = ({ movie, small = false }: FavoriteButtonProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  const isFavorited = favorites.some((fav) => fav.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorited) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite();
      }}
      className={cn(
        "rounded-full p-2 transition",
        small ? "p-1 text-sm" : "p-2 text-base",
        isFavorited
          ? "bg-yellow-400 text-black hover:bg-yellow-200"
          : "bg-neutral-800 text-white hover:bg-neutral-700"
      )}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorited ? "⭐" : "☆"}
    </button>
  );
};

export default FavoriteButton;
