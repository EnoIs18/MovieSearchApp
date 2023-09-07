import React from "react";
import { Box, Button, Pagination, TextField } from "@mui/material";
interface MoviesBySearchProps {
  movies: [];
}
const MoviesBySearch = ({ movies }: MoviesBySearchProps) => {
  return (
    <>
      {movies?.map((movie: any, index: any) => (
        <div key={index}>
          <h3>{movie.Title}</h3>
          <p>Type: {movie.Type}</p>
          <p>Year: {movie.Year}</p>
          <p>IMDb ID: {movie.imdbID}</p>
          {movie.Poster !== "N/A" && (
            <img
              src={movie.Poster}
              alt={movie.Title}
              width={150}
              height={150}
              loading="lazy"
            />
          )}
        </div>
      ))}
    </>
  );
};

export default MoviesBySearch;
