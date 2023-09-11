import React, { useContext, useEffect } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";

import CustomButton from "../CustomButton/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import FavoriteMovieItems from "../FavoriteMovieItems/FavoriteMovieItems";
import { FavoriteMoviesContext } from "../../context/FavoriteMoviesContext";
import NavBar from "../NavBar/NavBar";
import HdIcon from '@mui/icons-material/Hd';
import { logout, selectLoggedUser } from "../../data/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import NavbarDetails from "../NavbarDetails/NavbarDetails";
const FavoriteMovies = () => {
  const { currentMovies } =
    useContext(FavoriteMoviesContext);
    const loggedUser = useSelector(selectLoggedUser)    
const dispatch = useDispatch();


  return (
  <>
  <NavBar  position='static' >
  <NavbarDetails/>
    </NavBar>
  {
loggedUser && loggedUser?.favorites?.length  ?   
<Box sx={{  padding: 15,display: "grid", gridTemplateColumns: "30% 30% 30%", gap: 5 }}>
      <Typography  variant='h6' component='div' style={{fontSize:'200%',fontWeight:500,lineHeight: '1.75rem'}} >
         Total <span style={{ color: 'red' }}> {loggedUser?.favorites?.length}</span> favorite movies Found</Typography>
         <Box></Box>
        <Box></Box>
<FavoriteMovieItems movies={currentMovies} />
</Box>
 :
 <Typography  variant='h6' component='div' style={{fontSize:'200%',fontWeight:500,lineHeight: '1.75rem',
 display: 'flex',
 justifyContent: 'center',
 alignItems: 'center',
 width: '100%',
 height: '100vh', 
 flex: 1
 }} >
 No movies to show</Typography>
  }
 
  </>
  );
};

export default FavoriteMovies;
