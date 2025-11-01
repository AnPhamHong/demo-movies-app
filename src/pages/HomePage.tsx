import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Movie, MovieCategory, ViewMode } from "../types/movie";
import { movieApi } from "../api/api";
import TabBar from "../components/TabBar";
import MovieList from "../components/MovieList";
import HeroSlider from "../components/HeroSlider";
import ViewModeToggle from "../components/ViewModeToggle";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MovieCategory>("now_playing");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchHeroMovies = async () => {
      try {
        const response = await movieApi.getMovies("now_playing", 1);
        setHeroMovies(response.results);
      } catch (err) {
        console.error("Error fetching hero movies:", err);
      }
    };

    fetchHeroMovies();
  }, []);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      const response = await movieApi.searchMovies(query);
      setSearchResults(response.results);
    } catch (err) {
      console.error("Error searching movies:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleTabChange = (tab: MovieCategory) => {
    setActiveTab(tab);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <div className="home-page">
      {heroMovies.length > 0 && (
        <HeroSlider
          movies={heroMovies}
          onMovieClick={handleMovieClick}
          onSearch={handleSearch}
          searchResults={searchResults}
          isSearching={isSearching}
        />
      )}

      <div className="home-page__controls">
        <div className="home-page__tabs">
          <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        <div className="home-page__view-mode">
          <ViewModeToggle
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />
        </div>
      </div>

      <main className="home-page__content">
        <MovieList
          category={activeTab}
          onMovieClick={handleMovieClick}
          viewMode={viewMode}
        />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
