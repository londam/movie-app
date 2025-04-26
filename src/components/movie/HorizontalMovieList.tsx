"use client";

import MovieCard from "@/components/movie/MovieCard";
import { cn } from "@/lib/utils";
import { TMDBMovie } from "@/types/tmdb";
import { ChevronLeft, ChevronRight } from "lucide-react"; // shadcn uses lucide for icons
import { useRef, useState } from "react";

interface HorizontalMovieListProps {
  movies: TMDBMovie[];
  maxItems?: number;
}

export default function HorizontalMovieList({ movies, maxItems = 10 }: HorizontalMovieListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);

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

    e.preventDefault();

    const startX = e.pageX;
    const scrollLeft = el.scrollLeft;

    // let isDragging = false;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.pageX;
      const distance = Math.abs(x - startX);
      if (distance > 10) {
        setIsDragging(true);
      }
      const walk = (startX - x) * 1;
      el.scrollLeft = scrollLeft + walk;
    };

    const onMouseUp = (upEvent: MouseEvent) => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      if (isDragging) {
        upEvent.preventDefault();
        upEvent.stopPropagation(); // This prevents click event bubbling after drag
      }
      setIsDragging(false);
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
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMouseDown(e);
        }}
        onMouseUp={() => {
          setIsDragging(false);
        }}
        className={cn(
          "flex gap-4 overflow-x-auto scrollbar-hide px-8",
          isDragging ? "cursor-grabbing" : isHoveringCard ? "cursor-pointer" : "cursor-grab",
          !isDragging && "snap-x snap-mandatory"
        )}
      >
        {movies.slice(0, maxItems).map((movie, index) => (
          <div
            key={movie.id}
            className="flex-shrink-0 snap-start"
            onMouseEnter={() => setIsHoveringCard(true)}
            onMouseLeave={() => setIsHoveringCard(false)}
          >
            <MovieCard movie={movie} rank={index + 1} />
          </div>
        ))}
      </div>
    </div>
  );
}
