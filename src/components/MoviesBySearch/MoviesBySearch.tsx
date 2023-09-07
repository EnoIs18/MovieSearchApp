import React, { useState, useEffect } from "react";
import MovieItem from "./MovieItem";

interface MoviesBySearchProps {
  movies: any[]; // Update the type for movies
}

const MoviesBySearch = ({ movies }: MoviesBySearchProps) => {
  // Initialize a dictionary to track favorite icon state for each movie by IMDb ID
  const [favoriteIcons, setFavoriteIcons] = useState<{
    [imdbID: string]: boolean;
  }>(
    Object.fromEntries(
      movies ? movies.map((movie) => [movie.imdbID, false]) : []
    )
  );

  useEffect(() => {
    // Update the favoriteIcons dictionary when movies prop changes
    if (movies) {
      setFavoriteIcons(
        Object.fromEntries(movies.map((movie) => [movie.imdbID, false]))
      );
    }
  }, [movies]);

  const handleFavoriteClick = (imdbID: string) => {
    // Create a copy of the current state
    const newFavoriteIcons = { ...favoriteIcons };
    // Toggle the favorite icon state for the clicked movie
    newFavoriteIcons[imdbID] = !newFavoriteIcons[imdbID];
    // Update the state with the new dictionary
    setFavoriteIcons(newFavoriteIcons);
  };

  return (
    <>
      {movies?.map((movie, index) => (
        <MovieItem
          key={index}
          movie={movie}
          onFavoriteClick={() => handleFavoriteClick(movie.imdbID)}
          isFavorite={favoriteIcons[movie.imdbID]}
        />
      ))}
    </>
  );
};

export default MoviesBySearch;
