import { TMDBCastMember, TMDBMovieDetails, TMDBMovieListResponse } from "@/types/tmdb";
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

export async function getMovieDetails(movieId: string): Promise<TMDBMovieDetails> {
  return fetchFromTMDB<TMDBMovieDetails>(`/movie/${movieId}`);
}

export async function getMovieCredits(movieId: string): Promise<{ cast: TMDBCastMember[] }> {
  return fetchFromTMDB<{ cast: TMDBCastMember[] }>(`/movie/${movieId}/credits`);
}

export async function searchMovies(query: string) {
  const res = await fetchFromTMDB<{ results: { id: number; title: string }[] }>("/search/movie", {
    query,
  });

  return res.results.slice(0, 5); // Only take first 5 suggestions
}
