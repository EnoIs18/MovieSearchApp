import React from "react";
import FavoriteMovieItem from "../FavoriteMovieItem/FavoriteMovieItem";

interface MoviesBySearchProps {
  movies: any[];
}

const FavoriteMovieItems = ({ movies }: MoviesBySearchProps) => {

  return (
    <>
      {movies?.map((movie, index) => (
        
        <FavoriteMovieItem key={index} movie={movie} />
      ))}
    </>
  );
};

export default FavoriteMovieItems;
