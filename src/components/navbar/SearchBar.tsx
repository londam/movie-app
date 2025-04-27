"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"; // Your Shadcn input
import { fetchFromTMDB } from "@/lib/api"; // Your API fetcher
import { TMDBMovie } from "@/types/tmdb"; // Your movie types

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TMDBMovie[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const searchMovies = useCallback(async (search: string) => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const data = await fetchFromTMDB<{ results: TMDBMovie[] }>("/search/movie", {
        query: search,
      });
      setResults(data.results.slice(0, 5)); // Only show top 5 results
    } catch (error) {
      console.error("Failed to fetch search results", error);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchMovies(query);
    }, 300); // debounce time
    return () => clearTimeout(timeout);
  }, [query, searchMovies]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < results.length) {
        const selectedMovie = results[activeIndex];
        window.location.href = `/m/${selectedMovie.id}`;
      } else {
        router.push(`/search?query=${encodeURIComponent(query)}`);
      }
      setDropdownOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setDropdownOpen(true);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search movies..."
        className="rounded-full bg-neutral-800 text-white px-4 py-2"
      />

      {dropdownOpen && results.length > 0 && (
        <div className="absolute mt-2 w-full rounded-lg bg-neutral-900 shadow-lg border border-neutral-700 z-50">
          {results.map((movie, idx) => (
            <div
              key={movie.id}
              className={`px-4 py-2 cursor-pointer hover:bg-neutral-800 ${
                idx === activeIndex ? "bg-neutral-800" : ""
              }`}
              onMouseDown={() => {
                window.location.href = `/m/${movie.id}`;

                setDropdownOpen(false);
              }}
            >
              {movie.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
