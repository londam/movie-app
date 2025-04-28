"use client";
import React from "react";
import SearchBar from "./SearchBar";
import FavoritesMenu from "./FavoritesMenu";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <>
      <header className="w-full px-4 py-3 border-b border-neutral-800 bg-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-yellow-400 hover:text-yellow-200 transition"
          >
            🎬 Movie App
          </Link>

          {/* Right: Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 whitespace-nowrap">
            <Link
              href="/most-watched"
              className="text-sm font-semibold text-white hover:text-yellow-400 transition whitespace-nowrap"
            >
              Most Watched
            </Link>
            <SearchBar />
            <FavoritesMenu />
          </div>

          {/* Right: Mobile Menu (Hamburger) */}
          <div className="flex md:hidden items-center gap-2">
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
