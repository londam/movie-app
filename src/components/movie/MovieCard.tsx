"use client";

import FavoriteButton from "./FavoriteButton";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getImageUrl } from "@/lib/image";
import Link from "next/link";
import { TMDBMovie } from "@/types/tmdb";

interface MovieCardProps {
  movie: TMDBMovie;
  rank?: number;
  isDragging?: boolean;
}

export default function MovieCard({ movie, rank, isDragging }: MovieCardProps) {
  const CardContentElement = (
    <Card
      className="relative w-36 overflow-hidden bg-neutral-900 hover:border-yellow-400
   hover:shadow-yellow-400 transition border border-neutral-800 shadow-md"
    >
      {/* Ranking Badge */}
      {rank !== undefined && (
        <div className="absolute top-2 left-2 z-10 border-2 border-yellow-400 text-yellow-400 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md bg-neutral-900/80">
          {rank}
        </div>
      )}

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
        <h2 className="text-sm font-semibold text-white truncate" title={movie.title}>
          {movie.title}
        </h2>
      </CardContent>
    </Card>
  );

  if (isDragging) {
    return CardContentElement;
  }

  return (
    <Link href={`/m/${movie.id}`} scroll={false}>
      {CardContentElement}
    </Link>
  );
}
