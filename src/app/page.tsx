import NewestMoviesSection from "@/components/home/NewestMoviesSection";
import TopStreamingSection from "@/components/home/TopStreamingSection";
import MovieCard from "@/components/movie/MovieCard";
import { getPopularMovies } from "@/lib/movie-service";

export default async function HomePage() {
  const movies = await getPopularMovies();

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-yellow-400">Welcome to Movie App!</h1>
        <p className="mt-2 text-gray-300">Let&apos;s start building something awesome movies!</p>
      </div>
      <div className="p-6">
        <NewestMoviesSection />
        <TopStreamingSection />
      </div>
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
