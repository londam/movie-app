"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { TMDBMovie } from "@/types/tmdb";
import FavoriteButton from "../movie/FavoriteButton";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/image";

interface MovieDropdownListProps {
  movies: TMDBMovie[];
  activeIndex: number;
  onSelect: (movie: TMDBMovie) => void;
  showFavoriteButton?: boolean;
  className?: string;
  extraTopButton?: React.ReactNode;
}

export default function MovieDropdownList({
  movies,
  activeIndex,
  onSelect,
  showFavoriteButton = false,
  className,
  extraTopButton,
}: MovieDropdownListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active item
  // useEffect(() => {
  //   if (listRef.current) {
  //     const activeItem = listRef.current.querySelector(".active");
  //     if (activeItem) {
  //       (activeItem as HTMLElement).scrollIntoView({
  //         block: "nearest",
  //       });
  //     }
  //   }
  // }, [activeIndex]);

  return (
    <div
      ref={listRef}
      className={cn(
        "max-h-96 overflow-y-auto rounded-md bg-neutral-900 shadow-lg border border-neutral-700 p-2 space-y-2",
        className
      )}
    >
      {/* Optional top button */}
      {extraTopButton && (
        <div className="text-center text-sm text-yellow-400 hover:underline cursor-pointer">
          {extraTopButton}
        </div>
      )}

      {/* Movie list */}
      {movies.map((movie, index) => (
        <div
          data-testid={`movie-item-${movie.id}`}
          key={movie.id}
          onMouseDown={() => onSelect(movie)}
          className={cn(
            "flex items-center gap-4 p-2 cursor-pointer rounded hover:bg-neutral-800",
            index === activeIndex && "bg-neutral-800 active"
          )}
        >
          {/* FavoriteButton */}
          {showFavoriteButton && (
            <div onMouseDown={(e) => e.stopPropagation()}>
              <FavoriteButton movie={movie} small />
            </div>
          )}

          {/* Poster */}
          {movie.poster_path ? (
            <div className="relative w-8 h-12 flex-shrink-0 rounded overflow-hidden">
              <Image
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
          ) : (
            <div className="w-8 h-12 bg-neutral-700 flex items-center justify-center text-xs text-white">
              N/A
            </div>
          )}

          {/* Title + Year */}
          <div>
            <div className="text-sm text-white truncate max-w-[136px]" title={movie.title}>
              {movie.title}
            </div>
            <div className="text-xs text-gray-400">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
