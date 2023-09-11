import React from "react";
import { Navigate } from "react-router";
import FavoriteMovies from "../components/FavoriteMovies/FavoriteMovies";



interface ProtectedRouteProps {
    isUserLoggedIn: boolean;
  }
  
  const ProtectedRoute = ({
    isUserLoggedIn,
  }: ProtectedRouteProps) => {
    return isUserLoggedIn ? (
      <FavoriteMovies />
    ) : (
      <Navigate to="/" />
    );
  };
export default React.memo(ProtectedRoute);
