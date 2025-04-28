"use client";
import React from "react";
import SearchBar from "./SearchBar";
import FavoritesMenu from "./FavoritesMenu";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full px-4 py-3 border-b border-neutral-800 bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / App Title */}
        <Link
          href="/"
          className="text-2xl font-bold text-yellow-400 hover:text-yellow-200 transition"
        >
          🎬 Movie App
        </Link>
        <Link href="/most-watched">
          <h2>Most Watched</h2>
        </Link>
        {/* Right Side: Search + Favorites */}
        <div className="flex items-center gap-4">
          <SearchBar />

          <FavoritesMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
