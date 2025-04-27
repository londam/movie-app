export type TMDBMovie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  genre_ids: number[];
  release_date: string;
};

export type TMDBMovieListResponse = {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
};

export interface TMDBMovieDetails extends TMDBMovie {
  genres: { id: number; name: string }[];
  runtime: number;
  production_countries: { iso_3166_1: string; name: string }[];
  budget: number;
  revenue: number;
  tagline: string;
  backdrop_path: string;
}
