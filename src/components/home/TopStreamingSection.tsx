"use client";
const streamServices = ["Netflix", "Disney+", "Prime Video", "HBO Max"];

import { getPopularMovies } from "@/lib/movie-service";
import { TMDBMovie } from "@/types/tmdb";
import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HorizontalMovieList from "../movie/HorizontalMovieList";

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
      <SectionTitle title="Top 3 Movies by Streaming Service" />

      <Tabs defaultValue="Netflix" className="w-full inline-flex items-center ">
        <TabsList className="gap-1 mb-6 bg-neutral-800">
          {streamServices.map((service) => (
            <TabsTrigger
              key={service}
              value={service}
              className="text-white transition-all
              hover:text-yellow-400
              data-[state=active]:text-yellow-400
              data-[state=active]:bg-neutral-900
              data-[state=active]:border-b-2
              data-[state=active]:border-yellow-400
            "
            >
              {service}
            </TabsTrigger>
          ))}
        </TabsList>

        {streamServices.map((service, index) => (
          <TabsContent
            key={service}
            value={service}
            className="w-full sm:w-auto overflow-hidden sm:justify-items-center"
          >
            <HorizontalMovieList movies={movies.slice(index * 3, index * 3 + 3)} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TopStreamingSection;
