import { TMDBMovie } from "@/types/tmdb";
import MovieCard from "@/components/movie/MovieCard";

interface MovieGridProps {
  movies: TMDBMovie[];
  loading: boolean;
}

export default function MovieGrid({ movies, loading }: MovieGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-60 bg-neutral-800 animate-pulse rounded-md" />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return <div className="text-center text-neutral-400">No movies found.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
