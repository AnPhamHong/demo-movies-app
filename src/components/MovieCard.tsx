import { useState } from "react";
import { getImageUrl } from "../api/api";
import type { Movie } from "../types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="movie-card">
      <div className="poster">
        <img
          src={getImageUrl(movie.backdrop_path)}
          alt={movie.title}
          onLoad={() => setLoaded(true)}
          className={loaded ? "loaded" : ""}
        />
      </div>
      <div className="info">
        <h3>{movie.title}</h3>
        <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
      </div>
    </div>
  );
}
