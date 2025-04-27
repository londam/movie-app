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
  const [imdbScoreRange, setImdbScoreChange] = useState<[number, number]>(() => [7.5, 10]);
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const filteredMovies = movies.filter((movie) => {
    const releaseYear = parseInt(movie.release_date?.split("-")[0] || "0");
    const imdbScore = movie.vote_average || 0;
    const movieGenres = movie.genre_ids || [];

    const matchesYear = releaseYear >= yearRange[0] && releaseYear <= yearRange[1];

    const matchesScore = imdbScore >= imdbScoreRange[0] && imdbScore <= imdbScoreRange[1];

    const matchesGenre = genres.length === 0 || genres.some((g) => movieGenres.includes(Number(g)));

    return matchesYear && matchesScore && matchesGenre;
  });

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
        setMovies((prev) => [...prev, ...data.results]);
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
  }, [page]);

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
  }, [isFetchingNextPage]);

  return (
    <div className="p-6">
      <SectionTitle title="Most Watched Movies" />

      {/* Filters */}
      <FilterBar
        genres={genres}
        yearRange={yearRange}
        imdbScoreRange={imdbScoreRange}
        onGenresChange={setGenres}
        onYearRangeChange={setYearRange}
        onImdbScoreChange={setImdbScoreChange}
      />

      {/* Movie Grid */}
      <MovieGrid movies={filteredMovies} loading={loading && movies.length === 0} />
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}
