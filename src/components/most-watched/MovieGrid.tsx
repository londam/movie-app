import { TMDBMovie } from "@/types/tmdb";
import MovieCard from "@/components/movie/MovieCard";

interface MovieGridProps {
  movies: TMDBMovie[];
  loading: boolean;
  yearRange: [number, number];
  imdbScoreRange: [number, number];
  genres: string[];
}

export default function MovieGrid({
  movies,
  loading,
  genres,
  yearRange,
  imdbScoreRange,
}: MovieGridProps) {
  const filteredMovies = movies.filter((movie) => {
    const releaseYear = parseInt(movie.release_date?.split("-")[0] || "0");
    const imdbScore = movie.vote_average || 0;
    const movieGenres = movie.genre_ids || [];

    const matchesYear = releaseYear >= yearRange[0] && releaseYear <= yearRange[1];

    const matchesScore = imdbScore >= imdbScoreRange[0] && imdbScore <= imdbScoreRange[1];

    const matchesGenre = genres.length === 0 || genres.some((g) => movieGenres.includes(Number(g)));

    return matchesYear && matchesScore && matchesGenre;
  });

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-60 bg-neutral-800 animate-pulse rounded-md" />
        ))}
      </div>
    );
  }

  if (filteredMovies.length === 0) {
    return <div className="text-center text-neutral-400">No movies found.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {filteredMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
