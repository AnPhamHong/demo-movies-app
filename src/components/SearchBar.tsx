import React, { useState, useEffect, useRef } from "react";
import type { Movie } from "../types/movie";
import SearchDropdown from "./SearchDropdown";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  searchResults?: Movie[];
  isSearching?: boolean;
  onMovieClick?: (movieId: number) => void;
  showDropdown?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search movies...",
  searchResults = [],
  isSearching = false,
  onMovieClick,
  showDropdown = true,
}) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    onSearch(debouncedQuery.trim());
    if (debouncedQuery.trim()) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [debouncedQuery, onSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim()) {
      setShowResults(true);
    }
  };

  const handleClear = () => {
    setQuery("");
    setDebouncedQuery("");
    onSearch("");
    setShowResults(false);
  };

  const handleCloseDropdown = () => {
    setShowResults(false);
    setQuery("");
    setDebouncedQuery("");
    onSearch("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <form className="search-bar__form" onSubmit={handleSubmit}>
        <div className="search-bar__wrapper">
          <svg
            className="search-bar__icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="search-bar__input"
            placeholder={placeholder}
            value={query}
            onChange={handleChange}
          />
          {query && (
            <button
              type="button"
              className="search-bar__clear"
              onClick={handleClear}
            >
              ✕
            </button>
          )}
        </div>
      </form>

      {showDropdown && showResults && query.trim() && onMovieClick && (
        <SearchDropdown
          movies={searchResults}
          isLoading={isSearching}
          onMovieClick={onMovieClick}
          onClose={handleCloseDropdown}
        />
      )}
    </div>
  );
};

export default SearchBar;
