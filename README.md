# Movies

A modern movie discovery application built with ReactJS, TypeScript, and SCSS. Browse now playing and top-rated movies, search for your favorites, and view detailed information about each film.

## ✨ Features

- **Browse Movies**: View Now Playing and Top Rated movies with smooth tab switching
- **Search Functionality**: Search for movies with debounced input and instant results
- **Movie Details**: View comprehensive information including ratings, genres, runtime, budget, and revenue
- **View Modes**: Toggle between grid and list view for optimal browsing experience
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Loading States**: Skeleton loading screens for better UX
- **Error Handling**: Graceful error handling with retry functionality
- **Lazy Loading**: Images load lazily with fade-in animations
- **Modern UI**: Clean, Netflix-inspired design with smooth animations

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **React Router DOM** for navigation
- **Axios** for API calls
- **SCSS** for styling (no UI frameworks)
- **TMDB API** for movie data

## 📁 Project Structure

```
src/
├── api/                      # API services
│   └── api.ts                # TMDB API integration
├── assets/
│   └── react.svg
├── components/               # Reusable components
│   ├── ErrorMessage.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── HeroSlider.tsx
│   ├── Loader.tsx
│   ├── MovieCard.tsx
│   ├── MovieList.tsx
│   ├── Navbar.tsx
│   ├── SearchBar.tsx
│   ├── SearchDropdown.tsx
│   ├── Skeleton.tsx
│   ├── TabBar.tsx
│   └── ViewModeToggle.tsx
├── pages/                    # Page components
│   ├── HomePage.tsx
│   └── MovieDetailPage.tsx
├── services/                 # API logic
│   └── api.ts                # TMDB API functions
├── styles/                   # SCSS styles
│   ├── components/           # Component-specific styles
│   │   ├── error-message.scss
│   │   ├── footer.scss
│   │   ├── header.scss
│   │   ├── movie-card.scss
│   │   ├── movie-detail.scss
│   │   ├── movie-list.scss
│   │   ├── navbar.scss
│   │   ├── search-dropdown.scss
│   │   ├── search.scss
│   │   ├── skeleton.scss
│   │   ├── slider.scss
│   │   ├── tabs.scss
│   │   └── toggle.scss
│   ├── pages/                # Page-specific styles
│   │   └── home.scss
│   ├── index.scss            # Main import SCSS
│   ├── _global.scss
│   ├── _mixins.scss
│   └── _variables.scss
├── types/                    # TypeScript types
│   └── movie.ts
├── main.tsx                  # Entry point

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API Key (get it from [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd movies-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

4. Add your TMDB API key to `.env`:

```
REACT_APP_TMDB_API_KEY=your_api_key_here
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📝 Available Scripts

### `npm run dev`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder

## 🎨 Features in Detail

### Tab Switching

Switch between "Now Playing" and "Top Rated" movies with a smooth animated indicator.

### Search

- Debounced search input (500ms delay)
- Real-time search results
- Clear button to reset search
- Shows number of results found

### View Modes

- **Grid View**: Compact card layout perfect for browsing
- **List View**: Detailed view with movie overviews

### Movie Cards

- Lazy-loaded images with fade-in animation
- Hover effects with rating display
- Responsive design for all screen sizes

### Movie Details

- Full backdrop image
- Comprehensive movie information
- Genres, runtime, budget, and revenue
- Smooth animations and transitions
- Back button to return to previous page

### Loading & Error States

- Skeleton screens during data loading
- Error messages with retry functionality
- Graceful handling of missing images

## 🌐 API Integration

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) to fetch movie data.

### Endpoints Used:

- `/movie/now_playing` - Get now playing movies
- `/movie/top_rated` - Get top rated movies
- `/movie/popular` - Get popular movies
- `/movie/upcoming` - Get upcoming movies
- `/search/movie` - Search for movies
- `/movie/{id}` - Get movie details

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🎯 Future Enhancements

- [ ] Pagination for movie lists
- [ ] Movie trailers and videos
- [ ] Similar movies recommendations
- [ ] User favorites/watchlist

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Icons and design inspired by modern streaming platforms

## 👨‍💻 Author

Built with ❤️ using React, TypeScript, and SCSS
