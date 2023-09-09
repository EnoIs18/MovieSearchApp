import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useLazyGetMovieByIdQuery } from "../../data/endpoints/app.endpoints";
import { useSelector } from "react-redux";
import { selectIsLoadingState, selectMovieByIDState } from "../../data/store/movieByIdSlice";
import { Box, CircularProgress } from "@mui/material";
import { selectLoggedUser } from "../../data/store/userSlice";

const MovieDetails = () => {
  const { id } = useParams();
  const [getMovieById] = useLazyGetMovieByIdQuery();
  const { movieById } = useSelector(selectMovieByIDState);
  const isLoading = useSelector(selectIsLoadingState)
  useEffect(() => {
    getMovieById(id);
  }, [id]);
const favoriteMovies = useSelector(selectLoggedUser)
console.log(favoriteMovies);

  return (
    <Box>
    {
      isLoading ? <CircularProgress /> : <div>
      <h3>{movieById.Title}</h3>
      <p>Type: {movieById.Type}</p>
      <p>Year: {movieById.Year}</p>
      <p>IMDb ID: {movieById.imdbID}</p>
      {movieById.Poster !== "N/A" && (
        <img
          src={movieById.Poster}
          alt={movieById.Title}
          width={150}
          height={150}
          loading="lazy"
          />
          )}
    </div>
    }
    </Box>
    
  );
};

export default MovieDetails;
