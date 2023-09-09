import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import CustomTextfield from "../CustomTextField/CustomTextField";
import CustomButton from "../CustomButton/CustomButton";
import MoviesBySearch from "../MoviesBySearch/MoviesBySearch";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../data/store/userSlice";

const HomePage = () => {
  const { currentMovies, setSearchText, getMovies, searchText, currentPage } =
    useContext(Context);
const loggedUser = useSelector(selectLoggedUser)    

  return (
    <Box sx={{ padding: 5 }}>
      <CustomTextfield
      name='search'
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
  {
    loggedUser?.isLoggedIn ?      <Link to={`/movies/favorites`}>
    <CustomButton children={"Favorites"} onClick={() => {}} />
  </Link>:null
  }
      
      <Box sx={{ display: "grid", gridTemplateColumns: "30% 30% 30%", gap: 5 }}>
        
        <MoviesBySearch movies={currentMovies} />
      </Box>
    </Box>
  );
};

export default HomePage;
