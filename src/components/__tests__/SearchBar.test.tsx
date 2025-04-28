import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/navbar/SearchBar";
import { describe, expect, it, vi } from "vitest";

// Mock useRouter from next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock fetchFromTMDB
vi.mock("@/lib/api", () => ({
  fetchFromTMDB: vi.fn(),
}));

describe("SearchBar", () => {
  it("renders input field correctly", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toBeInTheDocument();
  });

  it("renders search button", () => {
    render(<SearchBar />);
    const button = screen.getByRole("button"); // We only have one button inside
    expect(button).toBeInTheDocument();
  });
});
