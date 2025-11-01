export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  adult: boolean;
  original_title: string;
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
export interface Genre {
  id: number;
  name: string;
}
export interface MovieDetail extends Movie {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
}

export type MovieCategory =
  | "now_playing"
  | "popular"
  | "top_rated"
  | "upcoming"
  | "trending";

export type ViewMode = 'list' | 'grid';
export interface TabBarProps {
  activeTab: MovieCategory;
  onTabChange: (tab: MovieCategory) => void;
}