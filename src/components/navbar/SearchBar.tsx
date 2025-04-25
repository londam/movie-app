"use client";
import React from "react";

const SearchBar = () => {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      className="px-4 py-2 rounded-md bg-neutral-900 text-white placeholder-gray-400 
      focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  );
};

export default SearchBar;
