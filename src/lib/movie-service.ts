import { fetchFromTMDB } from "./api";

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  // other fields later like overview, release_date, etc.
}

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
