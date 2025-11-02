// types.ts

// ========================
// Movie Models
// ========================
export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  adult: boolean;
}

export interface MovieDetail extends Movie {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
}

// ========================
// API Response
// ========================
export interface ApiResponse<T = Movie> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// ========================
// Constants
// ========================
export type MovieCategory =
  | "now_playing"
  | "popular"
  | "top_rated"
  | "upcoming"
  | "trending";

export type ViewMode = "list" | "grid";

// ========================
// Shared Props
// ========================
export interface Searchable {
  searchResults?: Movie[];
  isSearching?: boolean;
  onMovieClick?: (movieId: number) => void;
}

// ========================
// Component Props
// ========================
export interface TabBarProps {
  activeTab: MovieCategory;
  onTabChange: (tab: MovieCategory) => void;
}

export interface MovieCardProps {
  movie: Movie;
  onClick: (movieId: number) => void;
  viewMode: ViewMode;
}

export interface MovieListProps {
  category: MovieCategory;
  onMovieClick: (movieId: number) => void;
  viewMode?: ViewMode;
}

export interface SearchDropdownProps {
  movies: Movie[];
  isLoading: boolean;
  onMovieClick: (movieId: number) => void;
  onClose: () => void;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export interface HeaderProps extends Searchable {
  onSearch: (query: string) => void;
}

export interface HeroSliderProps extends Searchable {
  movies: Movie[];
  onMovieClick: (movieId: number) => void;
  onSearch: (query: string) => void;
}

export interface SearchBarProps extends Searchable {
  onSearch: (query: string) => void;
  placeholder?: string;
  showDropdown?: boolean;
}

export interface SkeletonProps {
  type?: "card" | "detail";
  count?: number;
}

export interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}
