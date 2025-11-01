import React from "react";
import type { MovieCategory } from "../types/movie";

interface TabBarProps {
  activeTab: MovieCategory;
  onTabChange: (tab: MovieCategory) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-bar">
      <button
        className={`tab-bar__button ${
          activeTab === "now_playing" ? "active" : ""
        }`}
        onClick={() => onTabChange("now_playing")}
      >
        Now Playing
      </button>
      <button
        className={`tab-bar__button ${
          activeTab === "top_rated" ? "active" : ""
        }`}
        onClick={() => onTabChange("top_rated")}
      >
        Top Rated
      </button>
      <div
        className="tab-bar__indicator"
        style={{
          transform: `translateX(${
            activeTab === "now_playing" ? "0" : "100"
          }%)`,
        }}
      />
    </div>
  );
};

export default TabBar;
