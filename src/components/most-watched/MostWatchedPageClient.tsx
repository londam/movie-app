"use client";

import SectionTitle from "@/components/home/SectionTitle";
import FilterBar from "./FilterBar";
import { useEffect, useState, useRef } from "react";
import { fetchFromTMDB } from "@/lib/api";
import { TMDBMovie, TMDBMovieListResponse } from "@/types/tmdb";
import MovieGrid from "./MovieGrid";

export default function MostWatchedPageClient() {
  const [genres, setGenres] = useState<string[]>([]);

  const [yearRange, setYearRange] = useState<[number, number]>(() => [1990, 2025]);
  const [score, setScore] = useState("");
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function loadMovies() {
      if (page === 1 && loading) return;
      if (page > 1 && isFetchingNextPage) return;

      if (page === 1) {
        setLoading(true);
      } else {
        setIsFetchingNextPage(true);
      }

      try {
        const data = await fetchFromTMDB<TMDBMovieListResponse>("/movie/popular", {
          page: page.toString(),
        });
        setMovies((prev) => [...prev, ...data.results]);
      } catch (error) {
        console.error(error);
      } finally {
        if (page === 1) {
          setLoading(false);
        } else {
          setIsFetchingNextPage(false);
        }
      }
    }

    loadMovies();
  }, [page]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isFetchingNextPage]);

  return (
    <div className="p-6">
      <SectionTitle title="Most Watched Movies" />

      {/* Filters */}
      <FilterBar
        genres={genres}
        yearRange={yearRange}
        score={score}
        onGenresChange={setGenres}
        onYearRangeChange={setYearRange}
        onScoreChange={setScore}
      />

      {/* Movie Grid */}
      <MovieGrid movies={movies} loading={loading && movies.length === 0} />
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}
