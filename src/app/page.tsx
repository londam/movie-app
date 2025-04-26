import NewestMoviesSection from "@/components/home/NewestMoviesSection";
import PopularByGenreSection from "@/components/home/PopularByGenreSection";
import TopStreamingSection from "@/components/home/TopStreamingSection";

export default async function HomePage() {
  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-yellow-400">Welcome to Movie App!</h1>
        <p className="mt-2 text-gray-300">Let&apos;s start building something awesome movies!</p>
      </div>
      <div className="p-6">
        <NewestMoviesSection />
        <TopStreamingSection />
        <PopularByGenreSection />
      </div>
    </>
  );
}
