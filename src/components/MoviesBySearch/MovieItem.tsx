import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
interface MovieProps {
  movie: any; // Update the type for a single movie
  onFavoriteClick: () => void;
  isFavorite: boolean;
}

const MovieItem = ({ movie, onFavoriteClick, isFavorite }: MovieProps) => {
  return (
    <Link to={`/movies/${movie.imdbID}`}>
      <div style={{ position: "relative" }}>
        <CustomButton
          onClick={(e) => {
            e.preventDefault();
            onFavoriteClick();
          }}
          style={{ position: "absolute", left: 200, zIndex: 999 }}
          children={
            isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />
          }
        />
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
    </Link>
  );
};

export default MovieItem;
