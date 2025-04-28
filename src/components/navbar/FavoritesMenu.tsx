"use client";

import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import MovieDropdownList from "../shared/MovieDropdownList";

export default function FavoritesMenu() {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % favorites.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + favorites.length) % favorites.length);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < favorites.length) {
        window.location.href = `/m/${favorites[activeIndex].id}`;
        // router.push(`/m/${favorites[activeIndex].id}`);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={wrapperRef} onKeyDown={handleKeyDown}>
      <button
        className="p-2 text-neutral-400 hover:text-yellow-400 transition"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Favorites"
      >
        ⭐({favorites.length})
      </button>

      {open && favorites.length > 0 && (
        <div className="absolute mt-2 right-0 w-64 z-50">
          <MovieDropdownList
            movies={favorites}
            activeIndex={activeIndex}
            // onSelect={onSelectMovie}
            onSelect={(movie) => {
              window.location.href = `/m/${movie.id}`;
            }}
            showFavoriteButton
            extraTopButton={
              <div onMouseDown={() => router.push("/favorites")}>See all favorites</div>
            }
          />
        </div>
      )}
    </div>
  );
}
