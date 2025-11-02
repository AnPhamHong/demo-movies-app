const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const getImageUrl = (
  path: string | null,
  size: string = "w500"
): string => {
  return path ? `${IMAGE_BASE_URL}${size}${path}` : "";
};

const fetchApi = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok)
      throw new Error(`API request failed with status ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("Movie API error:", error);
    throw error;
  }
};

export const movieApi = {
  /**
   * @param type 'now_playing' | 'top_rated' | 'popular' | 'top_rated' | 'upcoming' | 'trending'
   * @param page
   */
  getMovies: async (
    type:
      | "now_playing"
      | "top_rated"
      | "popular"
      | "top_rated"
      | "upcoming"
      | "trending",
    page = 1
  ) => {
    const url = `${BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${page}`;
    return fetchApi(url);
  },

  getMovieDetail: async (id: number) => {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
    return fetchApi(url);
  },

  searchMovies: async (query: string) => {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`;
    return fetchApi(url);
  },
};
