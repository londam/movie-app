"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMovieDetails } from "@/lib/movie-service";
import FavoriteButton from "@/components/movie/FavoriteButton";
import Image from "next/image";
import { X } from "lucide-react"; // using lucide for close icon (shadcn default)
import { TMDBMovieDetails } from "@/types/tmdb";
import Modal from "../Modal";

interface MovieDetailsModalProps {
  movieId: string;
}

export default function MovieDetailsModal({ movieId }: MovieDetailsModalProps) {
  const [movie, setMovie] = useState<TMDBMovieDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [movieId]);

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log("Pressed ESC, closing modal");
        onDismiss();
      }
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);
  if (!movie) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-60"
      onClick={() => router.back()}
    >
      <div
        className="relative bg-neutral-900 p-6 rounded-lg w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition"
          onClick={() => router.back()}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Poster and Info */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Poster */}
          {movie.poster_path && (
            <div className="relative w-32 md:w-48 h-48 md:h-72">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}

          {/* Text Info */}
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold text-yellow-400">{movie.title}</h1>
            <p className="text-sm text-neutral-400">{movie.overview}</p>

            <div className="flex flex-wrap gap-2 mt-4 text-sm text-neutral-300">
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
              <span>📅 {movie.release_date}</span>
              <span>⏱️ {movie.runtime} min</span>
              {movie.production_countries[0] && (
                <span>🌍 {movie.production_countries[0].name}</span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="px-3 py-1 bg-neutral-800 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Favorite Button */}
            <div className="mt-6">
              <FavoriteButton
                movie={{
                  id: movie.id,
                  title: movie.title,
                  poster_path: movie.poster_path,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
