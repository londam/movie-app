"use client";

import FavoriteButton from "./FavoriteButton";
import { FavoriteMovie } from "@/store/slices/favoritesSlice";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getImageUrl } from "@/lib/image";
interface MovieCardProps {
  movie: FavoriteMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card
      className="relative w-36 overflow-hidden bg-neutral-900 hover:border-yellow-400
       hover:shadow-yellow-400 transition border border-neutral-800 shadow-md"
    >
      {/* Favorite Button */}
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton movie={movie} />
      </div>

      {/* Poster */}
      <div className="w-full h-48 relative">
        <Image
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
          priority
        />
      </div>

      {/* Title */}
      <CardContent className="p-2 py-1 -my-4">
        <h2 className="text-sm font-semibold text-white truncate">{movie.title}</h2>
      </CardContent>
    </Card>
  );
}
