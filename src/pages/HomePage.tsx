import type { ApiResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_URL = "https://api.themoviedb.org/3/movie/now_playing";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const fetchNowPlaying = async (): Promise<ApiResponse> => {
  const { data } = await axios.get(API_URL, {
    params: { api_key: API_KEY, language: "en-US", page: 1 },
  });
  return data;
};

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["nowPlaying"],
    queryFn: fetchNowPlaying,
  });

  if (isLoading) return <p className="text-center mt-10">Loading movies...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load movies.</p>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎬 Now Playing</h1>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
