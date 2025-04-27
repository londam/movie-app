"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchMovies } from "@/lib/movie-service"; // <-- we'll build this next

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: number; title: string }[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Debounce logic
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.length > 1) {
        const data = await searchMovies(query);
        setResults(data);
        setDropdownOpen(true);
      } else {
        setResults([]);
        setDropdownOpen(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeout);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!results.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev === null || prev === results.length - 1 ? 0 : prev + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev === null || prev === 0 ? results.length - 1 : prev - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex !== null) {
          router.push(`/m/${results[selectedIndex].id}`);
        } else {
          router.push(`/search?q=${encodeURIComponent(query)}`);
        }
        setDropdownOpen(false);
      }
    },
    [results, selectedIndex, query, router]
  );

  return (
    <div className="relative w-64">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-2 rounded-md bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {isDropdownOpen && results.length > 0 && (
        <div className="absolute w-full bg-neutral-900 border border-neutral-700 rounded mt-1 max-h-64 overflow-y-auto z-50">
          {results.map((movie, idx) => (
            <div
              key={movie.id}
              className={`p-2 cursor-pointer hover:bg-neutral-700 ${
                idx === selectedIndex ? "bg-neutral-700" : ""
              }`}
              onMouseDown={() => {
                router.push(`/m/${movie.id}`);
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
