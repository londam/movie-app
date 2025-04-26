"use client";
const streamServices = ["Netflix", "Disney+", "Prime Video", "HBO Max"];

import { getPopularMovies } from "@/lib/movie-service";
import { TMDBMovie } from "@/types/tmdb";
import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import MovieCard from "../movie/MovieCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TopStreamingSection = () => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setLoading(false);
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <SectionTitle title="Top Movies by Streaming Service" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 bg-neutral-800 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <SectionTitle title="Top Movies by Streaming Service" />

      <Tabs defaultValue="Netflix" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          {streamServices.map((service) => (
            <TabsTrigger key={service} value={service}>
              {service}
            </TabsTrigger>
          ))}
        </TabsList>

        {streamServices.map((service, index) => (
          <TabsContent key={service} value={service}>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {movies.slice(index * 3, index * 3 + 6).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={{
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                  }}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TopStreamingSection;
