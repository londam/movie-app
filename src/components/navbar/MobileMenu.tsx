"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // lucide icons

import Link from "next/link";
import SearchBar from "./SearchBar";
import FavoritesMenu from "./FavoritesMenu";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-white hover:text-yellow-400 transition"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="absolute right-4 top-16 bg-neutral-900 p-4 rounded-lg shadow-lg flex flex-col gap-4 z-50 w-64">
          <Link
            href="/most-watched"
            className="text-white hover:text-yellow-400"
            onClick={() => setOpen(false)}
          >
            Most Watched
          </Link>
          <SearchBar />
          <FavoritesMenu />
        </div>
      )}
    </div>
  );
}
