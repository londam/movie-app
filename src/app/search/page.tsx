import { fetchFromTMDB } from "@/lib/api";
import { TMDBMovie } from "@/types/tmdb";
import MovieCard from "@/components/movie/MovieCard";

interface SearchPageProps {
  searchParams: { query?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query ?? "";

  let movies: TMDBMovie[] = [];

  if (query.trim()) {
    try {
      const data = await fetchFromTMDB<{ results: TMDBMovie[] }>("/search/movie", {
        query,
      });
      movies = data.results;
    } catch (error) {
      console.error("Failed to fetch search results", error);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">Search results for "{query}"</h1>

      {movies.length === 0 ? (
        <div className="text-center text-neutral-400">No results found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9  gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
