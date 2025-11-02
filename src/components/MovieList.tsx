import React, { useState, useEffect } from "react";
import { movieApi } from "../api/api";
import Skeleton from "./Skeleton";
import ErrorMessage from "./ErrorMessage";
import MovieCard from "./MovieCard";
import type { Movie, MovieCategory, MovieListProps } from "../types/movie";

const MovieList: React.FC<MovieListProps> = ({
  category,
  onMovieClick,
  viewMode = "grid",
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies(category, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page]);

  const fetchMovies = async (category: MovieCategory, page: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await movieApi.getMovies(category, page);

      setMovies(response.results);
      setTotalPages(response.total_pages || 1);
    } catch (err) {
      setError(
        "Failed to fetch movies. Please check your API key and try again."
      );
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchMovies(category, page);
  };

  if (loading) {
    return <Skeleton count={12} />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <React.Fragment>
      <div className={`movie-list ${viewMode}`}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
            viewMode={viewMode}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="page-info">
          Page {page} / {totalPages}
        </span>
        <button
          className="page-btn"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </React.Fragment>
  );
};

export default MovieList;
