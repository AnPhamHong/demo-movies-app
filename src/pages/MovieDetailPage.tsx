import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { MovieDetail } from "../types/movie";
import { getImageUrl, movieApi } from "../api/api";
import Skeleton from "../components/Skeleton";
import ErrorMessage from "../components/ErrorMessage";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      fetchMovieDetail(parseInt(id));
    }
  }, [id]);

  const fetchMovieDetail = async (movieId: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await movieApi.getMovieDetail(movieId);
      setMovie(data);
    } catch (err) {
      setError("Failed to fetch movie details. Please try again.");
      console.error("Error fetching movie detail:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (id) {
      fetchMovieDetail(parseInt(id));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="movie-detail-page">
        <Skeleton type="detail" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-detail-page">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="movie-detail-page">
      <button className="movie-detail-page__back" onClick={handleBack}>
        ← Back
      </button>

      <div
        className="movie-detail-page__backdrop"
        style={{
          backgroundImage: `url(${getImageUrl(
            movie.backdrop_path,
            "original"
          )})`,
        }}
      >
        <div className="movie-detail-page__backdrop-overlay"></div>
      </div>

      <div className="movie-detail-page__content">
        <div
          className={`movie-detail-page__poster ${imageLoaded ? "loaded" : ""}`}
        >
          <img
            src={getImageUrl(movie.poster_path, "w500")}
            alt={movie.title}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="movie-detail-page__info">
          <h1 className="movie-detail-page__title">{movie.title}</h1>

          {movie.tagline && (
            <p className="movie-detail-page__tagline">"{movie.tagline}"</p>
          )}

          <div className="movie-detail-page__meta">
            <span className="movie-detail-page__rating">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <span className="movie-detail-page__year">
              {new Date(movie.release_date).getFullYear()}
            </span>
            {movie.runtime > 0 && (
              <span className="movie-detail-page__runtime">
                {formatRuntime(movie.runtime)}
              </span>
            )}
            <span className="movie-detail-page__status">{movie.status}</span>
          </div>

          {movie.genres.length > 0 && (
            <div className="movie-detail-page__genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="movie-detail-page__genre">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <div className="movie-detail-page__section">
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </div>

          {(movie.budget > 0 || movie.revenue > 0) && (
            <div className="movie-detail-page__financial">
              {movie.budget > 0 && (
                <div className="movie-detail-page__financial-item">
                  <span className="label">Budget:</span>
                  <span className="value">{formatCurrency(movie.budget)}</span>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="movie-detail-page__financial-item">
                  <span className="label">Revenue:</span>
                  <span className="value">{formatCurrency(movie.revenue)}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
