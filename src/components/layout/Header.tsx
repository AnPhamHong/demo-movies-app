import React, { useEffect, useState } from "react";
import { MdOutlineLocalMovies } from "react-icons/md";
import type { HeaderProps } from "../../types/movie";
import SearchBar from "../SearchBar";

const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchResults = [],
  isSearching = false,
  onMovieClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`hero-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="hero-header__content">
        <div className="hero-header__logo">
          <MdOutlineLocalMovies color="#e50914" size={48} />
          <span>Movies</span>
        </div>
        <SearchBar
          onSearch={onSearch}
          searchResults={searchResults}
          isSearching={isSearching}
          onMovieClick={onMovieClick}
        />
      </div>
    </header>
  );
};

export default Header;
