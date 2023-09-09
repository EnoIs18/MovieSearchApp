import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addFavorite,
  removeFavorite,
  selectLoggedUser,
  setRate,
} from "../../data/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@mui/material";
interface MovieProps {
  movie: any;
}

const MovieItem = ({ movie }: MovieProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => {
    return state?.reducer?.user?.users?.find((u: any) => u.isLoggedIn);
  });

  const isUserFavorite =
    user && user?.favorites?.find((id: any) => id.imdbID === movie.imdbID);

  const handleFavoriteClick = () => {
    if (isUserFavorite) {
      dispatch(removeFavorite({ movie }));
    } else {
      dispatch(addFavorite({ movie }));
    }
  };
  return (
    <Link to={`/movies/${movie.imdbID}`} style={{textDecoration: 'none',color: "inherit"}}>
      <div style={{ position: "relative" }}>
        <CustomButton
          onClick={(e) => {
            e.preventDefault();
            handleFavoriteClick();
          }}
          style={{ position: "absolute", left: 200, zIndex: 999 }}
          children={
            isUserFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )
          }
        />
 
        <h3>{movie?.Title}</h3>
        <p>Type: {movie?.Type}</p>
        <p>Year: {movie?.Year}</p>
        <p>IMDb ID: {movie?.imdbID}</p>
        {movie?.Poster !== "N/A" && (
          <img
            src={movie?.Poster}
            alt={movie?.Title}
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
