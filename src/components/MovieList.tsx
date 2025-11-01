import React, { useState, useEffect } from "react";
import { movieApi } from "../api/api";
import Skeleton from "./Skeleton";
import ErrorMessage from "./ErrorMessage";
import MovieCard from "./MovieCard";
import type { Movie, MovieListProps } from "../types/movie";

const MovieList: React.FC<MovieListProps> = ({
  category,
  onMovieClick,
  viewMode = "grid",
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await movieApi.getMovies(category, page);

      setMovies(response.results);
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
    fetchMovies();
  };

  if (loading) {
    return <Skeleton count={12} />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
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
  );
};

export default MovieList;
