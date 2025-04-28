import { describe, expect, it } from "vitest";
import { getImageUrl } from "@/lib/image";

describe("getImageUrl", () => {
  it("returns correct URL with default size", () => {
    expect(getImageUrl("/poster.jpg")).toBe("https://image.tmdb.org/t/p/w500/poster.jpg");
  });

  it("returns correct URL with custom size", () => {
    expect(getImageUrl("/poster.jpg", "original")).toBe(
      "https://image.tmdb.org/t/p/original/poster.jpg"
    );
  });

  it("returns fallback image when path is empty", () => {
    expect(getImageUrl("")).toBe("/no-image.png");
  });
});
