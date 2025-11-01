import React from "react";

interface SkeletonProps {
  type?: "card" | "detail";
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ type = "card", count = 1 }) => {
  if (type === "detail") {
    return (
      <div className="skeleton-detail">
        <div className="skeleton-backdrop"></div>
        <div className="skeleton-content">
          <div className="skeleton-poster"></div>
          <div className="skeleton-info">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-body">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
