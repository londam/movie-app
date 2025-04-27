"use client";

import { useEffect, useState } from "react";
import { getMovieDetails } from "@/lib/movie-service";
import FavoriteButton from "@/components/movie/FavoriteButton"; // reuse
import Image from "next/image";
import { TMDBMovieDetails } from "@/types/tmdb";

interface MovieDetailsPageProps {
  movieId: string;
}

export default function MovieDetailsPage({ movieId }: MovieDetailsPageProps) {
  const [movie, setMovie] = useState<TMDBMovieDetails | null>(null);

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

  if (!movie) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Banner */}
      {movie.backdrop_path && (
        <div className="relative w-full h-[300px]">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover rounded-md"
            priority
          />
        </div>
      )}

      {/* Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        {movie.poster_path && (
          <div className="relative w-48 h-72">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover rounded-md"
              priority
            />
          </div>
        )}

        {/* Text Info */}
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold text-yellow-400">{movie.title}</h1>
          <p className="text-sm text-neutral-400">{movie.overview}</p>

          <div className="flex flex-wrap gap-2 mt-4 text-sm text-neutral-300">
            <span>IMDB ⭐{movie.vote_average.toFixed(1)}</span>
            <span>📅 {movie.release_date}</span>
            <span>⏱️ {movie.runtime} min</span>
            {movie.production_countries[0] && <span>🌍 {movie.production_countries[0].name}</span>}
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
  );
}
