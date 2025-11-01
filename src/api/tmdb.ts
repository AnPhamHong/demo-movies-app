const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const fetchMovies = async (category: 'now_playing' | 'top_rated') => {
  const res = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
};

export const searchMovies = async (query: string) => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
};

export const fetchMovieDetail = async (id: string) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
};