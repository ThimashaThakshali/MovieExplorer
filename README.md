# Movie Explorer

A modern web application for searching movies, discovering trending films, and saving your favorites.

## Features

- **Movie Search**: Look up any movie by title
- **Advanced Filtering**: Filter results by:
  - Genre
  - Year range (1900 - present)
  - Minimum rating (0-10)
- **Trending Movies**: Discover what's popular right now
- **Favorites**: Save your favorite movies for later
- **Responsive Design**: Works great on desktop and mobile devices

## Technologies Used

- React
- Material UI
- The Movie Database (TMDB) API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/movie-explorer.git
   cd movie-explorer
   ```

2. Install dependencies
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Create a `.env` file in the root directory and add your TMDB API key
   ```
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

### Search for Movies
Enter a movie title in the search bar and press Enter or click the search icon.

### Apply Filters
1. Select a genre from the dropdown
2. Adjust the year range slider
3. Set the minimum rating
4. Click "Apply Filters" to update your search results

### Save Favorites
Click the heart icon on any movie card to add it to your favorites.

## Credits

This application uses the TMDB API but is not endorsed or certified by TMDB.

