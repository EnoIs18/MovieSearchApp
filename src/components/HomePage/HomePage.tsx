import React, { useContext, useState } from "react";
import { Badge, Box, CircularProgress, createTheme, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import CustomTextfield from "../CustomTextField/CustomTextField";
import CustomButton from "../CustomButton/CustomButton";
import MoviesBySearch from "../MoviesBySearch/MoviesBySearch";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoggedUser } from "../../data/store/userSlice";
import NavBar from "../NavBar/NavBar";
import HdIcon from '@mui/icons-material/Hd';
import AuthModal from "../AuthModal/AuthModal";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from "@mui/icons-material/Favorite";
import CustomSelector from "../CustomSelector/CustomSelector";

const HomePage = () => {
  const { currentMovies,setSearchText, getMovies, searchText, currentPage ,totalResults,isLoading,moviesResult,selectorValue,
    setSelectorValue,openModal,setOpenModal} =useContext(Context);
const loggedUser = useSelector(selectLoggedUser)   
const handleClickOpen = () => {
  setOpenModal(true);
};

const handleClose = () => {
  setOpenModal(false);
};
const dispatch = useDispatch();
const yearsArray = []
const currentYear = new Date().getFullYear();

for (let year = 1980; year <= currentYear; year++) {
  yearsArray.push(year);
}
  return (
    <>
  <NavBar position='static' >
  <IconButton size='large'  edge='start'  aria-label='logo'>
<HdIcon style={{ color: 'white' }} />
</IconButton>
<Link to='/' style={{textDecoration: 'none',color: "inherit"}}>
<Typography  variant='h6' component='div'  > MOVIE APP</Typography>
</Link>
<CustomTextfield
name='search'
type="text"
onChange={(e) => setSearchText(e.target.value)}
value={searchText}
placeholder="Search your movie"
style={{
color: '#000',   
flexGrow:1 ,
fontSize:'250%',
backgroundColor: '#e0d5d5',
borderRadius:1,
 boxShadow: "0 0 8px rgba(255, 255, 255, 0.6)",
}}
children={
<CustomButton
    children={<SearchIcon fontSize="large"/>}
    onClick={() => {
      getMovies({ search: searchText, page: currentPage,year:selectorValue });
    }}
  />
}/>
<Stack direction={'row'} spacing={2}>
{loggedUser && loggedUser?.isLoggedIn ? (
<>
      <Link to={`/movies/favorites`}>
      <CustomButton    children={
        <Badge badgeContent={loggedUser?.favorites.length} color="primary">
          <FavoriteIcon />
        </Badge>
      }  style={{
              color: '#fff',    
          }}  />
      </Link>
<CustomButton
    style={{
        color: '#fff',    
    }}
    onClick={() => {
        dispatch(logout());
    }}
    children={"LOG OUT"}
    />
    </>
) : (
<AuthModal  open={openModal} handleClickOpen={handleClickOpen} handleClose={handleClose}/>
)} 
<CustomSelector  value={selectorValue} onChange={(newValue) => setSelectorValue(newValue)} placeholder='Select to sort by year'>
<MenuItem sx={{color:'black'}} key={''} value={''}>
Clear year          </MenuItem>
{yearsArray.map((year) => (
          <MenuItem sx={{color:'black'}} key={year} value={year}>
            {year}
          </MenuItem>
        ))}
</CustomSelector>
</Stack>
</NavBar>
<Box style={{
   
}}> 
  {isLoading ? <Box style={{  display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh', 
    flex: 1}}><CircularProgress /></Box> : 
    moviesResult?.data?.Error  ? 
    <Typography  variant='h6' component='div' style={{fontSize:'200%',fontWeight:500,lineHeight: '1.75rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh', 
    flex: 1
    }} >
    { moviesResult?.data?.Error}</Typography> : 
    <Box sx={{  padding: 15,display: "grid", gridTemplateColumns: "30% 30% 30%", gap: 5 }}>
      <Typography  variant='h6' component='div' style={{fontSize:'200%',fontWeight:500,lineHeight: '1.75rem'}} >
         Total <span style={{ color: 'red' }}> {totalResults}</span> movies Found</Typography>
         
        <Box></Box>
        <Box></Box>
        <MoviesBySearch movies={currentMovies} />
      </Box>
    }
</Box>

      
      </>
  );
};

export default HomePage;
