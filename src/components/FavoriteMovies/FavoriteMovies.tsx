import React, { useContext, useEffect } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";

import CustomButton from "../CustomButton/CustomButton";
import { Link } from "react-router-dom";
import FavoriteMovieItems from "../FavoriteMovieItems/FavoriteMovieItems";
import { FavoriteMoviesContext } from "../../context/FavoriteMoviesContext";
import NavBar from "../NavBar/NavBar";
import HdIcon from '@mui/icons-material/Hd';
import AuthModal from "../AuthModal/AuthModal";
import { logout, selectLoggedUser } from "../../data/store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const FavoriteMovies = () => {
  const { currentMovies, setSearchText, searchText, currentPage } =
    useContext(FavoriteMoviesContext);
    const loggedUser = useSelector(selectLoggedUser)    
const dispatch = useDispatch();
console.log(loggedUser?.favorites);

  return (
  <>
  <NavBar  position='static' >
  <IconButton size='large'  edge='start'  aria-label='logo'>

<HdIcon  fontSize='large' style={{ color: 'white' }} />
</IconButton>
<Link to='/' style={{textDecoration: 'none',color: "inherit"}}>
<Typography  variant='h6' component='div' > MOVIE APP</Typography>
</Link>
<Stack direction={'row'} spacing={2}>
{loggedUser && loggedUser?.isLoggedIn ? (
<CustomButton
    style={{
        color: '#fff',    
    }}
    onClick={() => {
        dispatch(logout());
    }}
    children={"LOG OUT"}
    />

) : (
<AuthModal />
)} 
</Stack>
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
