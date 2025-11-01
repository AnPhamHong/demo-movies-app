import React, { useState } from "react";
import type { Movie } from "../types/movie";
import { getImageUrl } from "../api/api";
import { FaHeart, FaInfoCircle, FaPlay } from "react-icons/fa";

interface MovieCardProps {
  movie: Movie;
  onClick: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const posterUrl = getImageUrl(movie.poster_path);
  const backdropUrl = getImageUrl(movie.backdrop_path);

  return (
    <div className="movie-card">
      <div
        className="movie-card__poster-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={posterUrl}
          alt={movie.title}
          className="movie-card__poster"
          onClick={() => onClick(movie.id)}
        />

        {isHovered && (
          <div className="movie-card__expanded">
            <img
              src={backdropUrl}
              alt={movie.title}
              className="expanded__poster"
            />
            <div className="expanded__content">
              <h3>{movie.title}</h3>
              <span className="sub">{movie.original_title}</span>
              <div className="actions">
                <button className="play">
                  <FaPlay /> Watch Now
                </button>
                <button className="like">
                  <FaHeart /> Add to Favorites
                </button>
                <button className="detail">
                  <FaInfoCircle /> View Details
                </button>
              </div>
              <div className="meta">
                <span className="badge">{movie.adult ? "18+" : "T16"}</span>
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span>⭐ {movie.vote_average.toFixed(1)}</span>
              </div>
              <p className="overview">
                {movie.overview.length > 300
                  ? `${movie.overview.slice(0, 300)}...`
                  : movie.overview}
              </p>
            </div>
          </div>
        )}
      </div>

      <div
        className="movie-card__title"
        title={movie.title} // tooltip khi hover
      >
        {movie.title}
      </div>
    </div>
  );
};

export default MovieCard;
