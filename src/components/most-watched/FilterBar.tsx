"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 16, name: "Animation" },
  { id: 10749, name: "Romance" },
  { id: 12, name: "Adventure" },
  { id: 9648, name: "Mystery" },
  { id: 53, name: "Thriller" },
];

interface FilterBarProps {
  genres: string[];
  year: string;
  score: string;
  onGenresChange: (value: string[]) => void;
  onYearChange: (value: string) => void;
  onScoreChange: (value: string) => void;
}

export default function FilterBar({
  genres,
  year,
  score,
  onGenresChange,
  onYearChange,
  onScoreChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      {/* Genres Multi-Select */}
      <Popover>
        <PopoverTrigger>
          <Button
            variant="outline"
            className="w-[200px] justify-start bg-neutral-900 text-white 
            border-neutral-700 hover:bg-neutral-800 hover:text-yellow-400"
          >
            {genres.length ? (
              <span className="truncate">
                {genres
                  .map((id) => GENRES.find((g) => g.id.toString() === id)?.name)
                  .filter(Boolean)
                  .join(", ")}
              </span>
            ) : (
              "Select Genres"
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-64 bg-neutral-900 text-white border border-neutral-700"
          align="start"
          sideOffset={4}
        >
          <div className="grid gap-2">
            {GENRES.map((genre) => (
              <div key={genre.id} className="flex items-center space-x-2">
                <Checkbox
                  id={genre.id.toString()}
                  checked={genres.includes(genre.id.toString())}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onGenresChange([...genres, genre.id.toString()]);
                    } else {
                      onGenresChange(genres.filter((g) => g !== genre.id.toString()));
                    }
                  }}
                />
                <Label htmlFor={genre.id.toString()}>{genre.name}</Label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

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
