"use client";

import MovieCard from "@/components/movie/MovieCard";
import { TMDBMovie } from "@/types/tmdb";

interface HorizontalMovieListProps {
  movies: TMDBMovie[];
}

export default function HorizontalMovieList({ movies }: HorizontalMovieListProps) {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
      {movies.map((movie) => (
        <div key={movie.id} className="flex-shrink-0">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
