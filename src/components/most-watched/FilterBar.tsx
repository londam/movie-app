"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "../ui/slider";

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
  yearRange: [number, number];
  imdbScoreRange: [number, number];
  onGenresChange: (value: string[]) => void;
  onYearRangeChange: (value: [number, number]) => void;
  onImdbScoreChange: (value: [number, number]) => void;
}

export default function FilterBar({
  genres,
  yearRange,
  imdbScoreRange,
  onGenresChange,
  onYearRangeChange,
  onImdbScoreChange,
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

      {/* Year Range Slider */}
      <div className="w-[280px] flex flex-col items-start">
        <Label className="mb-2 text-sm text-white">
          Year: {yearRange[0]} - {yearRange[1]}
        </Label>
        <Slider
          min={1950}
          max={2024}
          step={1}
          value={yearRange}
          onValueChange={(value) => onYearRangeChange(value as [number, number])}
          className="w-full [&_[data-slot=slider-range]]:bg-yellow-400 [&_[data-slot=slider-track]]:bg-neutral-900 [&_[role=slider]]:bg-yellow-400"
        />
      </div>

      {/* Score Filter */}
      <div className="w-[280px] flex flex-col items-start">
        <Label className="mb-2 text-sm text-white">
          IMDb Score: {imdbScoreRange[0]} - {imdbScoreRange[1]}
        </Label>
        <Slider
          min={0}
          max={10}
          step={0.1}
          value={imdbScoreRange}
          onValueChange={(value) => onImdbScoreChange(value as [number, number])}
          className="w-full [&_[data-slot=slider-range]]:bg-yellow-400 [&_[data-slot=slider-track]]:bg-neutral-900 [&_[role=slider]]:bg-yellow-400"
        />
      </div>
    </div>
  );
}
