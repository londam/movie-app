"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MovieCard from "@/components/movie/MovieCard";
import Link from "next/link";

export default function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  if (favorites.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Your Favorite Movies</h1>
        <h2 className="text-2xl font-bold mb-4">No favorites yet</h2>
        <Link href="/">
          <button className="px-6 py-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 transition">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Your Favorite Movies</h1>
      <h2 className="text-sm text-neutral-400 mb-6">You have {favorites.length} favorite movies</h2>
      <div className="justify-items-center grid gap-6 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
