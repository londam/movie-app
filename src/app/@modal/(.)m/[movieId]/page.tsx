import MovieDetailsModal from "@/components/movie-details/MovieDetailsModal";

interface PageProps {
  params: { movieId: string };
}

export default function MovieDetailsModalPage({ params }: PageProps) {
  return (
    <>
      <MovieDetailsModal movieId={params.movieId} />
    </>
  );
}
