"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { fetchFromTMDB } from "@/lib/api";
import { TMDBMovie } from "@/types/tmdb";
import { Search } from "lucide-react";
import MovieDropdownList from "../shared/MovieDropdownList";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TMDBMovie[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const searchMovies = useCallback(async (search: string) => {
    if (search.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const data = await fetchFromTMDB<{ results: TMDBMovie[] }>("/search/movie", {
        query: search,
      });
      setSearchResults(data.results.slice(0, 5)); // Only show top 5 results
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
      setActiveIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < searchResults.length) {
        const selectedMovie = searchResults[activeIndex];
        router.push(`/m/${selectedMovie.id}`);
        // window.location.href = `/m/${selectedMovie.id}`;
      } else {
        router.push(`/search?query=${encodeURIComponent(query)}`);
      }
      setDropdownOpen(false);
    }
  };

  //clear & hide search results if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSearchResults([]);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSearchClick = useCallback(() => {
    if (query.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  }, [query, router]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="flex items-center px-3 py-2">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setDropdownOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search movies..."
          className="rounded-b-md bg-neutral-800 text-white px-4 py-2"
        />
        <button
          onClick={onSearchClick}
          className="-ml-8 text-neutral-400 hover:text-yellow-400 transition"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
      {dropdownOpen && searchResults.length > 0 && (
        <div className="absolute bg-neutral-900 mt-2 w-full z-50">
          <MovieDropdownList
            movies={searchResults}
            activeIndex={activeIndex}
            onSelect={(movie) => {
              router.push(`/m/${movie.id}`);
              // window.location.href = `/m/${movie.id}`;
            }}
          />
        </div>
      )}
    </div>
  );
}
