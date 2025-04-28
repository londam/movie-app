"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { fetchFromTMDB } from "@/lib/api";
import { TMDBMovie } from "@/types/tmdb";
import Image from "next/image";
import { Search } from "lucide-react";

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
        window.location.href = `/m/${selectedMovie.id}`;
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
        <div className="absolute mt-2 w-full rounded-lg bg-neutral-900 shadow-lg border border-neutral-700 z-50">
          {searchResults.map((movie, index) => (
            <div
              key={movie.id}
              onMouseDown={() => {
                window.location.href = `/m/${movie.id}`;
              }}
              className={`flex items-center gap-4 p-2 cursor-pointer ${
                index === activeIndex ? "bg-neutral-800" : "hover:bg-neutral-700"
              }`}
            >
              {/* Poster */}
              {movie.poster_path ? (
                <div className="relative w-10 h-14 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              ) : (
                <div className="w-10 h-14 bg-neutral-700 flex items-center justify-center text-xs text-white">
                  N/A
                </div>
              )}

              {/* Title */}
              <div>
                <div className="text-sm text-white">{movie.title}</div>
                <div className="text-xs text-gray-500">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
