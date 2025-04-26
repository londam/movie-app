"use client";

import MovieCard from "@/components/movie/MovieCard";
import { TMDBMovie } from "@/types/tmdb";
import { ChevronLeft, ChevronRight } from "lucide-react"; // shadcn uses lucide for icons
import { useRef } from "react";

interface HorizontalMovieListProps {
  movies: TMDBMovie[];
  maxItems?: number;
}

export default function HorizontalMovieList({ movies, maxItems = 10 }: HorizontalMovieListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!listRef.current) return;
    const scrollAmount = 300;
    listRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = listRef.current;
    if (!el) return;

    const startX = e.pageX - el.offsetLeft;
    const scrollLeft = el.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1; // scroll-fastness multiplier
      el.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="relative group">
      {/* Nav Buttons */}
      <button
        className="absolute left-0 top-0 h-full bg-yellow-400 opacity-0 group-hover:opacity-25 hover:brightness-90 p-2 rounded-none z-10 transition-all duration-300"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>
      <button
        className="absolute right-0 top-0 h-full bg-yellow-400 opacity-0 group-hover:opacity-25 hover:brightness-90 p-2 rounded-none z-10 transition-all duration-300"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>

      {/* Movie List */}
      <div
        ref={listRef}
        onMouseDown={handleMouseDown}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-8"
      >
        {movies.slice(0, maxItems).map((movie) => (
          <div key={movie.id} className="flex-shrink-0 snap-start">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
