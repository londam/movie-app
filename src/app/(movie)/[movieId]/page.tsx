import MovieDetailsPage from "@/components/movie-details/MovieDetailsPage";

interface PageProps {
  params: { movieId: string };
}

export default function MovieDetails({ params }: PageProps) {
  return <MovieDetailsPage movieId={params.movieId} />;
}
