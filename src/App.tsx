import React, { useContext } from "react";
import "./App.css";

import PaginationHomePageProvider from "./context/PaginationHomePageProvider";
import HomePage from "./components/HomePage/HomePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import FavoriteMovies from "./components/FavoriteMovies/FavoriteMovies";
import PaginationFavoriteProvider from "./context/PaginationFavoriteMoviesProvider";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PaginationHomePageProvider>
              <HomePage />
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
