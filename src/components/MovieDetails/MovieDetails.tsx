import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useLazyGetMovieByIdQuery } from "../../data/endpoints/app.endpoints";
import { useSelector } from "react-redux";
import { selectMovieByIDState } from "../../data/store/movieByIdSlice";

const MovieDetails = () => {
  const { id } = useParams();
  const [getMovieById] = useLazyGetMovieByIdQuery();
  const { movieById } = useSelector(selectMovieByIDState);
  useEffect(() => {
    getMovieById(id);
  }, [id]);

  return (
    <div>
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
  );
};

export default MovieDetails;
