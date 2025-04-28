import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteButton from "../movie/FavoriteButton";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "@/store/slices/favoritesSlice";
import { TMDBMovie } from "@/types/tmdb";
import { describe, expect, it } from "vitest";
import type { FavoritesState } from "@/store/slices/favoritesSlice";

// Mock movie
const mockMovie: TMDBMovie = {
  id: 1,
  title: "Inception",
  release_date: "2010-07-16",
  poster_path: "/inception.jpg",
  overview: "string",
  genre_ids: [1, 2, 3],
  vote_average: 5.5,
};

// Helper to render with Redux
function renderWithStore(initialState: FavoritesState, small = false) {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: {
      favorites: initialState,
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <FavoriteButton movie={mockMovie} small={small} />
      </Provider>
    ),
  };
}

describe("FavoriteButton", () => {
  it("renders empty star if movie is not favorited", () => {
    renderWithStore({ favorites: [] });

    expect(screen.getByRole("button")).toHaveTextContent("☆");
    expect(screen.getByLabelText("Add to favorites")).toBeInTheDocument();
  });

  it("renders filled star if movie is favorited", () => {
    renderWithStore({ favorites: [mockMovie] });

    expect(screen.getByRole("button")).toHaveTextContent("⭐");
    expect(screen.getByLabelText("Remove from favorites")).toBeInTheDocument();
  });

  it("dispatches addFavorite when clicked and not favorited", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore({ favorites: [] });

    await user.click(screen.getByRole("button"));

    const state = store.getState();
    expect(state.favorites.favorites).toContainEqual(mockMovie);
  });

  it("dispatches removeFavorite when clicked and already favorited", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore({ favorites: [mockMovie] });

    await user.click(screen.getByRole("button"));

    const state = store.getState();
    expect(state.favorites.favorites).not.toContainEqual(mockMovie);
  });
});

describe("FavoriteButton", () => {
  it("applies smaller padding when small prop is true", () => {
    renderWithStore({ favorites: [] }, true);

    const button = screen.getByRole("button");
    expect(button.className).toContain("text-sm");
  });

  it("applies normal padding when small prop is false", () => {
    renderWithStore({ favorites: [] }, false);

    const button = screen.getByRole("button");
    expect(button.className).toContain("text-base");
  });
});
