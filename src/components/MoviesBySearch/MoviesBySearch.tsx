import React, { useState, useEffect } from "react";
import MovieItem from "./MovieItem";
;

interface MoviesBySearchProps {
  movies: any[];
}

const MoviesBySearch = ({ movies }: MoviesBySearchProps) => {

  return (
    <>
    
      {movies?.map((movie, index) => (
        <MovieItem key={index} movie={movie} />
      ))}
    </>
  );
};

export default MoviesBySearch;
