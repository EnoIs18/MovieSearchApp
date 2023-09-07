import React, { useContext } from "react";
import "./App.css";

import PaginationProvider from "./context/PaginationProvider";
import HomePage from "./components/HomePage/HomePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import MovieDetails from "./components/MovieDetails/MovieDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PaginationProvider>
              <HomePage />
            </PaginationProvider>
          }
        />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
