import React from "react";
import "./App.css";
import PaginationHomePageProvider from "./context/PaginationHomePageProvider";
import HomePage from "./components/HomePage/HomePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import FavoriteMovies from "./components/FavoriteMovies/FavoriteMovies";
import PaginationFavoriteProvider from "./context/PaginationFavoriteMoviesProvider";
import SimpleSnackbar from "./components/SnackBarNotification/SnackBarNotification";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PaginationHomePageProvider>
              <SimpleSnackbar>
              <HomePage />
                </SimpleSnackbar>
            </PaginationHomePageProvider>
          }
        />
        <Route
          path="/movies/favorites"
          element={
            <PaginationFavoriteProvider>
              <FavoriteMovies />
            </PaginationFavoriteProvider>
          }
        />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/favorites/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
