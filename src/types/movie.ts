export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}

export interface ApiResponse {
  results: Movie[];
}

export interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  };
}

export type MovieCategory = 'now_playing' | 'top_rated';
export type ViewMode = 'list' | 'grid';