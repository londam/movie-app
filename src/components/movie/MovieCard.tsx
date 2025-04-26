"use client";

import FavoriteButton from "./FavoriteButton";
import { FavoriteMovie } from "@/store/slices/favoritesSlice";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
interface MovieCardProps {
  movie: FavoriteMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="relative w-48 overflow-hidden bg-neutral-900 hover:border-yellow-400 hover:shadow-yellow-400 transition border border-neutral-800 shadow-md">
      {/* Favorite Button */}
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton movie={movie} />
      </div>

      {/* Poster */}
      <div className="w-full h-72 relative">
        <Image
          src={movie.poster_path}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
          priority
        />
      </div>

      {/* Title */}
      <CardContent className="p-3">
        <h2 className="text-sm font-semibold text-white">{movie.title}</h2>
      </CardContent>
    </Card>
  );
}
