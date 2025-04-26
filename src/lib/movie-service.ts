import { TMDBMovie } from "@/types/tmdb";
import { fetchFromTMDB } from "./api";

interface TMDBMovieListResponse {
  results: TMDBMovie[];
}

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
