import { TMDBMovieListResponse } from "@/types/tmdb";
import { fetchFromTMDB } from "./api";

export async function getPopularMovies() {
  const data = await fetchFromTMDB<TMDBMovieListResponse>("/movie/popular", {
    language: "en-US",
    page: "1",
  });

  return data.results;
}

export async function getNowPlayingMovies() {
  const data = await fetchFromTMDB<TMDBMovieListResponse>("/movie/now_playing", {
    language: "en-US",
    page: "1",
  });

  return data.results;
}

export async function getPopularMoviesByGenre(genreId: number) {
  const data = await fetchFromTMDB<TMDBMovieListResponse>("/discover/movie", {
    with_genres: genreId.toString(),
    sort_by: "popularity.desc",
  });
  return data.results;
}
