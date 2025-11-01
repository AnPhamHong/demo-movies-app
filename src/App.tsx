import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NowPlaying from "./pages/NowPlaying";
import Search from "./pages/Search";
import TopRated from "./pages/TopRated";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/now-playing" element={<NowPlaying />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
