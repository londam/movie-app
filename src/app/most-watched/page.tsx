// src/app/most-watched/page.tsx

import SectionTitle from "@/components/home/SectionTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Most Watched Movies | MovieApp",
  description: "Discover the most popular and most watched movies right now!",
};

export default function MostWatchedPage() {
  return (
    <div className="p-6">
      {/* Page title */}
      <SectionTitle title="Most Watched Movies" />

      {/* Filters - we'll build here next */}
      <div className="my-6">{/* (filters coming soon...) */}</div>

      {/* Movie Grid */}
      <div>{/* (movies coming soon...) */}</div>
    </div>
  );
}
