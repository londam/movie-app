"use client";
import { RootState } from "@/store";
import { addFavorite, FavoriteMovie, removeFavorite } from "@/store/slices/favoritesSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  movie: FavoriteMovie;
}

const FavoriteButton = ({ movie }: FavoriteButtonProps) => {
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
      onClick={toggleFavorite}
      className={cn(
        "rounded-full p-2 transition",
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
