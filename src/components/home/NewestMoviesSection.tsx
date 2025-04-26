"use client";
import { getNowPlayingMovies } from "@/lib/movie-service";
import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import MovieCard from "../movie/MovieCard";
import { TMDBMovie } from "@/types/tmdb";
import HorizontalMovieList from "../movie/HorizontalMovieList";

const NewestMoviesSection = () => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      try {
        const moviesData = await getNowPlayingMovies();
        setMovies(moviesData);
      } catch (error) {
        console.log({ error });
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <SectionTitle title="Newest Movies" />
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-36 h-48 bg-neutral-800 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <SectionTitle title="Newest Movies" />
        <p className="text-red-500">Failed to load movies. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <SectionTitle title="Newest Movies" />
      <HorizontalMovieList movies={movies.slice(0, 10)} />
    </div>
  );
};

export default NewestMoviesSection;
