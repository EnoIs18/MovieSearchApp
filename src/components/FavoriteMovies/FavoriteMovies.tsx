import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";

import CustomTextfield from "../CustomTextField/CustomTextField";
import CustomButton from "../CustomButton/CustomButton";
import { Link } from "react-router-dom";
import FavoriteMovieItems from "../FavoriteMovieItems/FavoriteMovieItems";
import { FavoriteMoviesContext } from "../../context/FavoriteMoviesContext";

const FavoriteMovies = () => {
  const { currentMovies, setSearchText, searchText, currentPage } =
    useContext(FavoriteMoviesContext);
  return (
    <Box sx={{ padding: 5 }}>
      <CustomTextfield
      name='search'
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        placeholder="Search your movie"
      />

      <Link to={`/favorites`}>
        <CustomButton children={"Favorites"} onClick={() => {}} />
      </Link>
      <Box sx={{ display: "grid", gridTemplateColumns: "30% 30% 30%", gap: 5 }}>
        <FavoriteMovieItems movies={currentMovies} />
      </Box>
    </Box>
  );
};

export default FavoriteMovies;
