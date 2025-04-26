import MovieCard from "@/components/movie/MovieCard";

const mockMovie = {
  id: 1,
  title: "Interstellar",
  poster_path: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
};

export default function HomePage() {
  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-yellow-400">Welcome to Movie App!</h1>
        <p className="mt-2 text-gray-300">Let&apos;s start building something awesome movies!</p>
      </div>
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Render multiple cards for testing */}
        <MovieCard movie={mockMovie} />
        <MovieCard movie={{ ...mockMovie, id: 2, title: "Inception" }} />
        <MovieCard movie={{ ...mockMovie, id: 3, title: "The Dark Knight" }} />
      </div>
    </>
  );
}
