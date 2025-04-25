"use client";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

const FavoritesMenu = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  return (
    <div className="relative">
      <button className="px-3 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800">
        ⭐ Favorites ({favorites.length})
      </button>
    </div>
  );
};

export default FavoritesMenu;
