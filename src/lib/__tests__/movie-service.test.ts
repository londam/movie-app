import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getPopularMoviesByGenre,
  getMovieDetails,
  getMovieCredits,
  searchMovies,
} from "@/lib/movie-service";
import { fetchFromTMDB } from "@/lib/api";

// Mock fetchFromTMDB
vi.mock("@/lib/api", () => ({
  fetchFromTMDB: vi.fn(),
}));

describe("movie-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getPopularMovies fetches popular movies", async () => {
    (fetchFromTMDB as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      results: [{ id: 1, title: "Popular Movie" }],
    });

    const movies = await getPopularMovies();
    expect(movies).toEqual([{ id: 1, title: "Popular Movie" }]);
    expect(fetchFromTMDB).toHaveBeenCalledWith("/movie/popular", { language: "en-US", page: "1" });
  });

  it("getNowPlayingMovies fetches now playing movies", async () => {
    (fetchFromTMDB as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      results: [{ id: 2, title: "Now Playing Movie" }],
    });

    const movies = await getNowPlayingMovies();
    expect(movies).toEqual([{ id: 2, title: "Now Playing Movie" }]);
    expect(fetchFromTMDB).toHaveBeenCalledWith("/movie/now_playing", {
      language: "en-US",
      page: "1",
    });
  });

  it("getPopularMoviesByGenre fetches movies filtered by genre", async () => {
    (fetchFromTMDB as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      results: [{ id: 3, title: "Genre Movie" }],
    });

    const movies = await getPopularMoviesByGenre(28);
    expect(movies).toEqual([{ id: 3, title: "Genre Movie" }]);
    expect(fetchFromTMDB).toHaveBeenCalledWith("/discover/movie", {
      with_genres: "28",
      sort_by: "popularity.desc",
    });
  });

  it("getMovieDetails fetches movie details", async () => {
    (fetchFromTMDB as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: 4,
      title: "Movie Details",
    });

    const movie = await getMovieDetails("4");
    expect(movie).toEqual({ id: 4, title: "Movie Details" });
    expect(fetchFromTMDB).toHaveBeenCalledWith("/movie/4");
  });

  it("getMovieCredits fetches movie credits", async () => {
    (fetchFromTMDB as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      cast: [{ id: 5, name: "Actor Name" }],
    });

    const credits = await getMovieCredits("5");
    expect(credits).toEqual({ cast: [{ id: 5, name: "Actor Name" }] });
    expect(fetchFromTMDB).toHaveBeenCalledWith("/movie/5/credits");
  });

  it("searchMovies fetches search results and limits to 5", async () => {
    (fetchFromTMDB as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      results: [
        { id: 6, title: "Result 1" },
        { id: 7, title: "Result 2" },
        { id: 8, title: "Result 3" },
        { id: 9, title: "Result 4" },
        { id: 10, title: "Result 5" },
        { id: 11, title: "Result 6" }, // Should be cut off
      ],
    });

    const results = await searchMovies("query");
    expect(results.length).toBe(5);
    expect(results.map((r) => r.title)).toEqual([
      "Result 1",
      "Result 2",
      "Result 3",
      "Result 4",
      "Result 5",
    ]);
    expect(fetchFromTMDB).toHaveBeenCalledWith("/search/movie", { query: "query" });
  });
});
