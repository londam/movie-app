"use client";
import { RootState } from "@/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const FavoritesMenu = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  return (
    <div className="relative">
      <Link href="/favorites">
        <button className="px-3 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800">
          ⭐({favorites.length}) Favorites
        </button>
      </Link>
    </div>
  );
};

export default FavoritesMenu;
