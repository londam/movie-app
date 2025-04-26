"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  genre: string;
  year: string;
  score: string;
  onGenreChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onScoreChange: (value: string) => void;
}

export default function FilterBar({
  genre,
  year,
  score,
  onGenreChange,
  onYearChange,
  onScoreChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      {/* Genre Filter */}
      <Select value={genre} onValueChange={onGenreChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          <SelectItem value="28">Action</SelectItem>
          <SelectItem value="35">Comedy</SelectItem>
          <SelectItem value="18">Drama</SelectItem>
          <SelectItem value="27">Horror</SelectItem>
          <SelectItem value="878">Sci-Fi</SelectItem>
          {/* Add more genres if you want */}
        </SelectContent>
      </Select>

      {/* Year Filter */}
      <Select value={year} onValueChange={onYearChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Years</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
          <SelectItem value="2021">2021</SelectItem>
          <SelectItem value="2020">2020</SelectItem>
          {/* You can dynamically generate years too later */}
        </SelectContent>
      </Select>

      {/* Score Filter */}
      <Select value={score} onValueChange={onScoreChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select Score" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Scores</SelectItem>
          <SelectItem value="7">Above 7</SelectItem>
          <SelectItem value="8">Above 8</SelectItem>
          <SelectItem value="9">Above 9</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
