import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
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

const FavoriteMovieItem = ({ movie }: MovieProps) => {
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
    <Link to={`/movies/favorites/${movie?.imdbID}`}>
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
               <Rating
        name="simple-controlled"
        value={movie?.rating}
        onClick={(e)=>{
e.stopPropagation()
        }}
        onChange={(event, newValue) => {
          dispatch(setRate({favoriteMovie:movie,newValue}))
        }}
      />
        <h3>{movie.Title}</h3>
        {
          movie.rating ===0 ?
          <h3>
            <StarBorderIcon />  Rate
          </h3>
          :
          <h3>
            <StarRateIcon /> {movie.rating}
          </h3>
        }
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

export default FavoriteMovieItem;
