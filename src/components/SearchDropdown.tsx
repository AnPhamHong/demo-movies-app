import React from "react";
import type { Movie } from "../types/movie";
import { getImageUrl } from "../api/api";
interface SearchDropdownProps {
  movies: Movie[];
  isLoading: boolean;
  onMovieClick: (movieId: number) => void;
  onClose: () => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  movies,
  isLoading,
  onMovieClick,
  onClose,
}) => {
  if (isLoading) {
    return (
      <div className="search-dropdown">
        <div className="search-dropdown__loading">
          <div className="search-dropdown__spinner"></div>
          <p>Đang tìm kiếm...</p>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="search-dropdown">
        <div className="search-dropdown__empty">
          <p>Không tìm thấy kết quả</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-dropdown">
      <div className="search-dropdown__header">
        <h3>Danh sách phim</h3>
      </div>
      <div className="search-dropdown__list">
        {movies.slice(0, 5).map((movie) => (
          <div
            key={movie.id}
            className="search-dropdown__item"
            onClick={() => {
              onMovieClick(movie.id);
              onClose();
            }}
          >
            <div className="search-dropdown__poster">
              <img
                src={getImageUrl(movie.poster_path, "w92")}
                alt={movie.title}
              />
            </div>
            <div className="search-dropdown__info">
              <h4 className="search-dropdown__title">{movie.title}</h4>
              {movie.overview && (
                <p className="search-dropdown__subtitle">
                  {movie.overview.length > 50
                    ? `${movie.overview.substring(0, 50)}...`
                    : movie.overview}
                </p>
              )}
              <div className="search-dropdown__meta">
                <span className="search-dropdown__rating">
                  T{Math.floor(movie.vote_average)}
                </span>
                {movie.release_date && (
                  <>
                    <span className="search-dropdown__dot">•</span>
                    <span className="search-dropdown__year">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  </>
                )}
                <span className="search-dropdown__dot">•</span>
                <span className="search-dropdown__duration">1h 38m</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDropdown;
