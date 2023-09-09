import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";

import { Context } from "../../context/Context";
import CustomTextfield from "../CustomTextField/CustomTextField";
import CustomButton from "../CustomButton/CustomButton";
import { Link } from "react-router-dom";
import FavoriteMovieItems from "../FavoriteMovieItems/FavoriteMovieItems";

const FavoriteMovies = () => {
  const { currentMovies, setSearchText, getMovies, searchText, currentPage } =
    useContext(Context);
  return (
    <Box sx={{ padding: 5 }}>
      <CustomTextfield
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        placeholder="Search your movie"
      />
      <CustomButton
        children={"Search"}
        variant="contained"
        onClick={() => {
          getMovies({ search: searchText, page: currentPage });
        }}
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
