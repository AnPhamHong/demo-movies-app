import React, { useState, useEffect } from "react";
import type { Movie } from "../types/movie";
import { getImageUrl } from "../api/api";
import SearchBar from "./SearchBar";
import { MdOutlineLocalMovies } from "react-icons/md";

interface HeroSliderProps {
  movies: Movie[];
  onMovieClick: (movieId: number) => void;
  onSearch: (query: string) => void;
  searchResults?: Movie[];
  isSearching?: boolean;
}

const HeroSlider: React.FC<HeroSliderProps> = ({
  movies,
  onMovieClick,
  onSearch,
  searchResults = [],
  isSearching = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const topMovies = movies.slice(0, 5);

  useEffect(() => {
    if (topMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [topMovies.length]);

  if (topMovies.length === 0) return null;

  const currentMovie = topMovies[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + topMovies.length) % topMovies.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % topMovies.length);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="hero-slider">
      <div className="hero-slider__backdrop">
        <img
          src={getImageUrl(currentMovie.backdrop_path, "original")}
          alt={currentMovie.title}
          className="hero-slider__backdrop-image"
        />
        <div className="hero-slider__backdrop-overlay"></div>
      </div>

      <header className="hero-slider__header">
        <div className="hero-slider__header-content">
          <div className="hero-slider__logo">
            <MdOutlineLocalMovies color="#e50914" size={48} /> Movies
          </div>
          <div className="hero-slider__search">
            <SearchBar
              onSearch={onSearch}
              searchResults={searchResults}
              isSearching={isSearching}
              onMovieClick={onMovieClick}
            />
          </div>
        </div>
      </header>

      <div className="hero-slider__content">
        <div className="hero-slider__info">
          <h1 className="hero-slider__title">{currentMovie.title}</h1>

          <div className="hero-slider__meta">
            <span className="hero-slider__rating">
              ⭐ {currentMovie.vote_average.toFixed(1)}
            </span>
            <span className="hero-slider__year">
              {currentMovie.release_date
                ? new Date(currentMovie.release_date).getFullYear()
                : "N/A"}
            </span>
          </div>

          <p className="hero-slider__overview">
            {currentMovie.overview.length > 200
              ? `${currentMovie.overview.substring(0, 200)}...`
              : currentMovie.overview}
          </p>

          <div className="hero-slider__actions">
            <button
              className="hero-slider__button hero-slider__button--play"
              onClick={() => onMovieClick(currentMovie.id)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Now
            </button>
            <button
              className="hero-slider__button hero-slider__button--info"
              onClick={() => onMovieClick(currentMovie.id)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              More Info
            </button>
          </div>
        </div>

        <div className="hero-slider__thumbnails">
          {topMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={`hero-slider__thumbnail ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={getImageUrl(movie.poster_path, "w185")}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="hero-slider__nav hero-slider__nav--prev"
        onClick={handlePrevious}
        aria-label="Previous"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button
        className="hero-slider__nav hero-slider__nav--next"
        onClick={handleNext}
        aria-label="Next"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>

      <div className="hero-slider__indicators">
        {topMovies.map((_, index) => (
          <button
            key={index}
            className={`hero-slider__indicator ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
