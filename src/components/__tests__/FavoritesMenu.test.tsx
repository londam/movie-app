import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoritesMenu from "@/components/navbar/FavoritesMenu";
import { Provider } from "react-redux";
import favoritesReducer from "@/store/slices/favoritesSlice";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { RootState } from "@/store";
import { TMDBMovie } from "@/types/tmdb";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const mockMovie: TMDBMovie = {
  id: 123,
  title: "The Matrix",
  release_date: "1999-03-31",
  poster_path: "/matrix.jpg",
  overview: "short overview",
  vote_average: 5.5,
  genre_ids: [1, 3, 4],
};

const reducer = combineReducers({
  favorites: favoritesReducer,
});

const createTestStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer,
    preloadedState,
  });
};

function renderWithStore(preloadedState?: Partial<RootState>) {
  const store = createTestStore(preloadedState);

  return render(
    <Provider store={store}>
      <FavoritesMenu />
    </Provider>
  );
}
describe("FavoritesMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Favorites button with correct count", () => {
    renderWithStore({
      favorites: {
        favorites: [],
      },
    });

    expect(screen.getByRole("button", { name: /Favorites/i })).toHaveTextContent("⭐(0)");
  });

  it("opens dropdown when button is clicked", async () => {
    const user = userEvent.setup();

    renderWithStore({
      favorites: {
        favorites: [mockMovie],
      },
    });

    const button = screen.getByRole("button", { name: /Favorites/i });
    await user.click(button);

    expect(screen.getByText("The Matrix")).toBeInTheDocument();
  });
});
