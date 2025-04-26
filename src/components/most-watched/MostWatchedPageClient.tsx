"use client";

import SectionTitle from "@/components/home/SectionTitle";
import FilterBar from "./FilterBar";
import { useEffect, useState } from "react";
import { fetchFromTMDB } from "@/lib/api";
import { TMDBMovie, TMDBMovieListResponse } from "@/types/tmdb";
import MovieGrid from "./MovieGrid";

export default function MostWatchedPageClient() {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [score, setScore] = useState("");
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      try {
        const data = await fetchFromTMDB<TMDBMovieListResponse>("/movie/popular", {
          page: page.toString(),
        });
        setMovies((prev) => [...prev, ...data.results]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [page]);

  return (
    <div className="p-6">
      <SectionTitle title="Most Watched Movies" />

      {/* Filters */}
      <FilterBar
        genre={genre}
        year={year}
        score={score}
        onGenreChange={setGenre}
        onYearChange={setYear}
        onScoreChange={setScore}
      />

      {/* Movie Grid */}
      <MovieGrid movies={movies} loading={loading && movies.length === 0} />
      {!loading && (
        <div className="flex justify-center my-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded transition-all"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
