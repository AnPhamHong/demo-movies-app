const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'

export const getImageUrl = (path: string | null, size: string = 'w500') => {
  return path ? `${IMAGE_BASE_URL}${size}${path}` : '';
};

export const movieApi = {
  async getNowPlaying(page = 1) {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch now playing movies');
    return res.json();
  },

  async getTopRated(page = 1) {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch top rated movies');
    return res.json();
  },

  async getMovieDetail(id: number) {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error('Failed to fetch movie details');
    return res.json();
  },

  async searchMovies(query: string) {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to search movies');
    return res.json();
  },
};