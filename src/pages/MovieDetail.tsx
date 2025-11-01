import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetail } from "../api/tmdb";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMovieDetail(id!);
        setMovie(data);
      } catch {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  return (
    <main className="page">
      <div className="movie-detail">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="info">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>⭐ {movie.vote_average}</p>
        </div>
      </div>
    </main>
  );
}
