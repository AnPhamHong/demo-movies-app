import { MdOutlineLocalMovies } from "react-icons/md";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar__logo">
        <MdOutlineLocalMovies /> Movies
      </h1>

      <ul className="navbar__links">
        <li>
          <NavLink
            to="/now-playing"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Now Playing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/top-rated"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Top Rated
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Search
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
