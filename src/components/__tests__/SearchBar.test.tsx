import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "@/components/navbar/SearchBar";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
};

// Mock useRouter from next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

const mockMovie1 = {
  id: 123,
  title: "Inception",
  release_date: "2010-07-16",
  poster_path: "/inception.jpg",
};

const mockMovie2 = {
  id: 124,
  title: "Minecrat",
  release_date: "2011-07-16",
  poster_path: "/minecraft.jpg",
};

// Mock fetchFromTMDB
vi.mock("@/lib/api", () => ({
  fetchFromTMDB: vi.fn(async () => ({
    results: [mockMovie1, mockMovie2],
  })),
}));

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
});

beforeEach(() => {
  vi.clearAllMocks(); // ✅ clears calls to all mock functions
});

describe("SearchBar", () => {
  it("renders input field correctly", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toBeInTheDocument();
  });

  it("renders search button", () => {
    render(<SearchBar />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("updates input value on typing", async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search movies...");
    await userEvent.type(input, "inception");

    expect((input as HTMLInputElement).value).toBe("inception");
  });

  it("opens dropdown with results after typing and makes sure movie is in dropdown", async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search movies...");
    await userEvent.type(input, mockMovie1.title.toLowerCase());

    // Wait for movie title to appear
    expect(await screen.findByText(mockMovie1.title)).toBeInTheDocument();

    // verify year is rendered
    expect(screen.getByText(new Date(mockMovie1.release_date).getFullYear())).toBeInTheDocument();

    // verify poster alt attribute (if poster exists)
    expect(screen.getByAltText(mockMovie1.title)).toBeInTheDocument();
  });

  it("does not navigate when search query is empty", async () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search movies...");
    const button = screen.getByRole("button");

    // No typing
    await userEvent.click(button);

    // Should NOT navigate
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it("opens dropdown with results after typing and presses ArrowDown key twice and ArrowUp key", async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search movies...");
    await userEvent.type(input, "in");

    const movieItem1 = await screen.findByTestId(`movie-item-${mockMovie1.id}`);
    const movieItem2 = await screen.findByTestId(`movie-item-${mockMovie2.id}`);

    // Move down
    await userEvent.keyboard("{ArrowDown}");
    expect(movieItem1).toHaveClass("active");
    expect(movieItem2).not.toHaveClass("active");

    // Move down
    await userEvent.keyboard("{ArrowDown}");
    expect(movieItem2).toHaveClass("active");
    expect(movieItem1).not.toHaveClass("active");

    // Move up
    await userEvent.keyboard("{ArrowUp}");
    expect(movieItem1).toHaveClass("active");
    expect(movieItem2).not.toHaveClass("active");

    // Press Enter to select
    await userEvent.keyboard("{Enter}");
    expect(mockRouter.push).toHaveBeenCalledWith(`/m/${mockMovie1.id}`);
  });

  it("closes dropdown when clicking outside", async () => {
    const user = userEvent.setup();

    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search movies...");

    await user.type(input, "inception");

    await screen.findByText("Inception");

    const outsideDiv = document.createElement("div");
    outsideDiv.textContent = "Outside";
    document.body.appendChild(outsideDiv);

    await user.click(screen.getByText("Outside"));

    expect(screen.queryByText("Inception")).not.toBeInTheDocument();
  });
});
