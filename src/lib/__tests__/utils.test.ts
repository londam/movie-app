import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (class name utility)", () => {
  it("merges multiple classes correctly", () => {
    expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white");
  });

  it("handles conditional classes", () => {
    expect(cn("p-4", false && "hidden", "text-center")).toBe("p-4 text-center");
  });

  it("removes duplicates using tailwind-merge rules", () => {
    expect(cn("text-sm", "text-lg")).toBe("text-lg"); // tailwind-merge keeps the last
  });

  it("returns an empty string if no arguments", () => {
    expect(cn()).toBe("");
  });
});
