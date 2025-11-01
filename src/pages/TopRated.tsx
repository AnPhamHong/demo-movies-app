import { useEffect, useState } from "react";
import { fetchMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import type { Movie } from "../types/movie";

export default function TopRated() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMovies("top_rated");
        setMovies(data.results);
      } catch {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="page">
      <h2>Top Rated</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
