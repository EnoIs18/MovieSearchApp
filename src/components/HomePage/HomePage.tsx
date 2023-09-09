import React, { useContext } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
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
const HomePage = () => {
  const { currentMovies,setSearchText, getMovies, searchText, currentPage ,totalResults} =
    useContext(Context);
const loggedUser = useSelector(selectLoggedUser)    
const dispatch = useDispatch();
  return (
    <>
  <NavBar position='static' >
  <IconButton size='large'  edge='start'  aria-label='logo'>

<HdIcon style={{ color: 'white' }} />
</IconButton>
<Typography  variant='h6' component='div' > MOVIE APP</Typography>
<CustomTextfield
name='search'
type="text"
onChange={(e) => setSearchText(e.target.value)}
value={searchText}
placeholder="Search your movie"
style={{
color: '#fff',   
flexGrow:1 ,
width:'50%',
backgroundColor: '#e0d5d5',
borderRadius:1,
 boxShadow: "0 0 8px rgba(255, 255, 255, 0.6)"
}}
children={
<CustomButton
    children={<SearchIcon fontSize="medium"/>}
    variant="contained"
    onClick={() => {
      getMovies({ search: searchText, page: currentPage });
    }}
    style={{
      backgroundColor:'#f20000'
    }}
  />
}/>
<Stack direction={'row'} spacing={2}>
{loggedUser && loggedUser?.isLoggedIn ? (
<>
<CustomButton
    style={{
        color: '#fff',    
    }}
    onClick={() => {
        dispatch(logout());
    }}
    children={"LOG OUT"}
    />
<Link to={`/movies/favorites`}>
<CustomButton    children={"Favorites"}  style={{
        color: '#fff',    
    }}  />
</Link>
    </>
) : (
<AuthModal />
)} 
</Stack>
</NavBar>

      <Box sx={{  padding: 15,display: "grid", gridTemplateColumns: "30% 30% 30%", gap: 5 }}>
      <Typography  variant='h6' component='div' > Total {totalResults} movies Found</Typography>
        <Box></Box>
        <Box></Box>
        <MoviesBySearch movies={currentMovies} />
      </Box>
      </>
  );
};

export default HomePage;
