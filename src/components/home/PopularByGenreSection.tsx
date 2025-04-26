"use client";
import { TMDBMovie } from "@/types/tmdb";
import React, { useEffect, useState } from "react";
import HorizontalMovieList from "../movie/HorizontalMovieList";
import SectionTitle from "./SectionTitle";
import { getPopularMoviesByGenre } from "@/lib/movie-service";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  // up to 10 genres like the task says
];

const PopularByGenreSection = () => {
  const [moviesByGenre, setMoviesByGenre] = useState<Record<number, TMDBMovie[]>>({});

  useEffect(() => {
    async function load() {
      const allData: Record<number, TMDBMovie[]> = {};
      for (const genre of genres) {
        const movies = await getPopularMoviesByGenre(genre.id);
        allData[genre.id] = movies;
      }
      setMoviesByGenre(allData);
    }
    load();
  }, []);

  return (
    <div className="p-6 space-y-12">
      <SectionTitle title="Popular by Genre" />

      {genres.map((genre) => (
        <div
          key={genre.id}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          {/* Genre Title */}
          <div className="md:w-1/4">
            <h3 className="text-lg font-semibold">
              Top 10 <span className="text-yellow-400">{genre.name}</span> movies
            </h3>
          </div>

          {/* Movie List */}
          <div className="md:w-3/4">
            {moviesByGenre[genre.id] ? (
              <HorizontalMovieList movies={moviesByGenre[genre.id].slice(0, 10)} />
            ) : (
              <div className="h-48 bg-neutral-800 animate-pulse rounded-lg" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularByGenreSection;
