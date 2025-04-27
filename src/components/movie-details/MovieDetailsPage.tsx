"use client";

import { useEffect, useState } from "react";
import { getMovieCredits, getMovieDetails } from "@/lib/movie-service";
import FavoriteButton from "@/components/movie/FavoriteButton"; // reuse
import Image from "next/image";
import { TMDBCastMember, TMDBMovieDetails } from "@/types/tmdb";

interface MovieDetailsPageProps {
  movieId: string;
}

export default function MovieDetailsPage({ movieId }: MovieDetailsPageProps) {
  const [movie, setMovie] = useState<TMDBMovieDetails | null>(null);

  const [cast, setCast] = useState<TMDBCastMember[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [movieData, creditsData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
        ]);
        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10));
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [movieId]);

  if (!movie) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Banner */}
      {movie.backdrop_path && (
        <div className="relative w-full h-[300px]">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover rounded-md"
            priority
          />
        </div>
      )}

      {/* Title and Tagline */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-yellow-400">{movie.title}</h1>
        {movie.tagline && (
          <p className="italic text-neutral-400">{`&ldquo` + movie.tagline + `&ldquo`}</p>
        )}
        <FavoriteButton
          movie={{
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
          }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* Poster */}
        {movie.poster_path && (
          <div className="relative w-48 h-72">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover rounded-md"
              priority
            />
          </div>
        )}

        {/* Text Details */}
        <div className="flex-1 space-y-4 text-sm text-neutral-300">
          <p className="text-neutral-400">{movie.overview}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>📅 {movie.release_date}</span>
            <span>⏱️ {movie.runtime} min</span>
            {movie.production_countries.length > 0 && (
              <span>🌍 {movie.production_countries[0].name}</span>
            )}
            <span>Status: {movie.status}</span>
          </div>
          {/* Cast */}
          {cast.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {cast.map((actor) => (
                  <div key={actor.cast_id} className="text-center space-y-2">
                    {actor.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        width={120}
                        height={180}
                        className="rounded-md object-cover mx-auto"
                      />
                    ) : (
                      <div className="w-[120px] h-[180px] bg-neutral-800 rounded-md mx-auto flex items-center justify-center">
                        <span className="text-xs text-neutral-400">No Image</span>
                      </div>
                    )}
                    <div className="text-sm font-semibold text-yellow-400">{actor.name}</div>
                    <div className="text-xs text-neutral-400">{actor.character}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Budget and Revenue */}
          <div className="flex flex-wrap gap-3 mt-4">
            {movie.budget > 0 && <span>💵 Budget: ${movie.budget.toLocaleString()}</span>}
            {movie.revenue > 0 && <span>💰 Revenue: ${movie.revenue.toLocaleString()}</span>}
          </div>

          {/* Homepage */}
          {movie.homepage && (
            <div className="mt-2">
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 underline"
              >
                Visit Official Website
              </a>
            </div>
          )}

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="px-3 py-1 bg-neutral-800 rounded-full">
                {genre.name}
              </span>
            ))}
          </div>

          {/* Languages */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {movie.spoken_languages.map((lang) => (
                <span key={lang.iso_639_1} className="bg-neutral-700 px-3 py-1 rounded-full">
                  {lang.name}
                </span>
              ))}
            </div>
          </div>
          {/* Production Companies */}
          {movie.production_companies.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Production Companies</h2>
              <div className="flex flex-wrap gap-4">
                {movie.production_companies.map((company) => (
                  <div key={company.id} className="flex items-center gap-2">
                    {company.logo_path && (
                      <div className="p-2 bg-white rounded-md">
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          width={100} // fixed width (or whatever looks good)
                          height={40} // fixed height
                          className="object-contain h-8 w-auto"
                        />
                      </div>
                    )}
                    <span>{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorite Button */}
          <div className="mt-8">
            <FavoriteButton
              movie={{
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
