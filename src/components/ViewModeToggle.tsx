import React from "react";
import type { ViewModeToggleProps } from "../types/movie";

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="view-mode-toggle">
      <button
        className={`view-mode-toggle__button ${
          viewMode === "grid" ? "active" : ""
        }`}
        onClick={() => onViewModeChange("grid")}
        title="Grid View"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <rect x="2" y="2" width="7" height="7" rx="1" />
          <rect x="11" y="2" width="7" height="7" rx="1" />
          <rect x="2" y="11" width="7" height="7" rx="1" />
          <rect x="11" y="11" width="7" height="7" rx="1" />
        </svg>
      </button>
      <button
        className={`view-mode-toggle__button ${
          viewMode === "list" ? "active" : ""
        }`}
        onClick={() => onViewModeChange("list")}
        title="List View"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <rect x="2" y="3" width="16" height="3" rx="1" />
          <rect x="2" y="8.5" width="16" height="3" rx="1" />
          <rect x="2" y="14" width="16" height="3" rx="1" />
        </svg>
      </button>
    </div>
  );
};

export default ViewModeToggle;
