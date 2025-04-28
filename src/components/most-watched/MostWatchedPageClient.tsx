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
  const [imdbScoreRange, setImdbScoreRange] = useState<[number, number]>(() => [7.5, 10]);
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Utility: Check if a movie matches current filters
  function matchesFilters(movie: TMDBMovie) {
    const releaseYear = parseInt(movie.release_date?.split("-")[0] || "0");
    const imdbScore = movie.vote_average || 0;
    const movieGenres = movie.genre_ids || [];

    const matchesYear = releaseYear >= yearRange[0] && releaseYear <= yearRange[1];
    const matchesScore = imdbScore >= imdbScoreRange[0] && imdbScore <= imdbScoreRange[1];
    const matchesGenre = genres.length === 0 || genres.some((g) => movieGenres.includes(Number(g)));

    return matchesYear && matchesScore && matchesGenre;
  }

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

        if (data.results.length === 0) {
          setHasMore(false); // no more data from API
          return;
        }

        const newFilteredMovies = data.results.filter(matchesFilters);

        if (newFilteredMovies.length === 0 && data.results.length > 0) {
          // No match from this batch, but more data may exist on next page
          setPage((prev) => prev + 1);
        } else {
          setMovies((prev) => [...prev, ...newFilteredMovies]);
        }
      } catch (error) {
        console.error(error);
        setHasMore(false); // stop on error too (reached end of pages from API)
      } finally {
        if (page === 1) {
          setLoading(false);
        } else {
          setIsFetchingNextPage(false);
        }
      }
    }

    loadMovies();
  }, [page, genres, yearRange, imdbScoreRange]);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    if (!hasMore) return;

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
  }, [isFetchingNextPage, hasMore]);

  return (
    <div className="p-6">
      <SectionTitle title="Most Watched Movies" />

      {/* Filters */}
      <FilterBar
        genres={genres}
        yearRange={yearRange}
        imdbScoreRange={imdbScoreRange}
        onGenresChange={(newGenres) => {
          setGenres(newGenres);
          setMovies([]);
          setPage(1);
          setHasMore(true);
        }}
        onYearRangeChange={(newRange) => {
          setYearRange(newRange);
          setMovies([]);
          setPage(1);
          setHasMore(true);
        }}
        onImdbScoreChange={(newScoreRange) => {
          setImdbScoreRange(newScoreRange);
          setMovies([]);
          setPage(1);
          setHasMore(true);
        }}
      />

      {/* Movie Grid */}
      <MovieGrid movies={movies} loading={loading && movies.length === 0} />
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}
