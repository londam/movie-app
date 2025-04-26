import { Metadata } from "next";
import MostWatchedPageClient from "@/components/most-watched/MostWatchedPageClient";

export const metadata: Metadata = {
  title: "Most Watched Movies | MovieApp",
  description: "Discover the most popular and most watched movies right now!",
};

export default function MostWatchedPage() {
  return <MostWatchedPageClient />;
}
