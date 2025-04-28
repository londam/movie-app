import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "@/store/slices/favoritesSlice";
import MovieCard from "@/components/movie/MovieCard";
import { describe, it, expect, vi } from "vitest";
import { ImgHTMLAttributes } from "react";

// Mock next/image to behave like normal img in tests
vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: {
      favorites: { favorites: [] },
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

const mockMovie = {
  id: 1,
  title: "Inception",
  poster_path: "/inception.jpg",
  release_date: "2010-07-16",
  overview: "A thief who steals corporate secrets through the use of dream-sharing technology.",
  vote_average: 8.8,
  genre_ids: [28, 878, 12],
};

describe("MovieCard", () => {
  it("renders movie title", () => {
    renderWithStore(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("renders poster image with correct src", () => {
    renderWithStore(<MovieCard movie={mockMovie} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining("/w500/inception.jpg"));
    expect(img).toHaveAttribute("alt", "Inception");
  });

  it("renders ranking badge if rank prop is provided", () => {
    renderWithStore(<MovieCard movie={mockMovie} rank={1} />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders FavoriteButton", () => {
    renderWithStore(<MovieCard movie={mockMovie} />);

    expect(screen.getByRole("button", { name: /Add to favorites/i })).toBeInTheDocument();
  });

  it("wraps content in a Link when not dragging", () => {
    renderWithStore(<MovieCard movie={mockMovie} isDragging={false} />);

    const title = screen.getByText("Inception");
    expect(title.closest("a")).toBeTruthy(); // Wrapped in link
  });

  it("wraps content in a Link when not dragging", () => {
    renderWithStore(<MovieCard movie={mockMovie} />);

    const title = screen.getByText("Inception");
    const link = title.closest("a");

    expect(link).toBeInTheDocument(); // First, make sure there is a <a>
    expect(link).toHaveAttribute("href", `/m/${mockMovie.id}`); // Check correct href
  });

  it("does not wrap in Link when isDragging is true", () => {
    renderWithStore(<MovieCard movie={mockMovie} isDragging={true} />);

    const title = screen.getByText("Inception");
    expect(title.closest("a")).toBeFalsy(); // No link wrapping
  });
});
