export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  genre_ids: number[];
  release_date: string;
}

export interface TMDBMovieListResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}
