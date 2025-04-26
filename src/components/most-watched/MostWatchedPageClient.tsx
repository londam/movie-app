"use client";

import SectionTitle from "@/components/home/SectionTitle";
import FilterBar from "./FilterBar";
import { useState } from "react";

export default function MostWatchedPageClient() {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [score, setScore] = useState("");

  return (
    <div className="p-6">
      <SectionTitle title="Most Watched Movies" />

      {/* Filters */}
      <FilterBar
        genre={genre}
        year={year}
        score={score}
        onGenreChange={setGenre}
        onYearChange={setYear}
        onScoreChange={setScore}
      />

      {/* Movie Grid */}
      <div>{/* Movies will go here */}</div>
    </div>
  );
}
