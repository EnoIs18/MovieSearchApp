import React, {  useEffect,useState } from "react";
import { useParams } from "react-router";
import { useLazyGetMovieByIdQuery } from "../../data/endpoints/app.endpoints";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoadingState, selectMovieByIDState } from "../../data/store/movieByIdSlice";
import { Box, Card, CardMedia, IconButton, Stack, Typography } from "@mui/material";
import { logout, selectLoggedUser } from "../../data/store/userSlice";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import HdIcon from '@mui/icons-material/Hd';
import AuthModal from "../AuthModal/AuthModal";
import { handleMovieDetailsFontSizeByLength } from "../../shared/handleFontSize";
import RatingCircularProgress from "../RatingCircularProgress/RatingCircularProgress";
import LongTextComponent from "../LongTextComponent/LongTextComponent";
import { Context } from "../../context/Context";

const VerticalBar = () => (
  <Box
    style={{
      borderLeft: "3px solid #ffffffd6",
      height: 20,
      marginRight: "10px",
    }}
  />
);

const MovieDetailItem = ({  fontSize,value,letterSpacing,description }:any) => (
    <Typography variant="h6" component="p" style={{ fontSize:fontSize, fontWeight: 500, lineHeight: '1.75rem',letterSpacing:letterSpacing }}>
      {description}{value}
    </Typography>
);

const MovieDetails = () => {
  const { id } = useParams();
  const [getMovieById] = useLazyGetMovieByIdQuery();
  const { movieById } = useSelector(selectMovieByIDState);
  const loggedUser = useSelector(selectLoggedUser)
  const dispatch = useDispatch();
const [open,setOpen]=useState(false)
  const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

  useEffect(() => {
    getMovieById(id);
  }, [id]);
  const percentage = (movieById?.imdbRating / 10) * 100;
  return (
    <Box sx={{display:'grid' ,mt:'4%'
    }}> 
      <NavBar position="static">
        <IconButton size="large" edge="start" aria-label="logo">
          <HdIcon fontSize="large" style={{ color: 'white' }} />
        </IconButton>
        <Link to='/' style={{ textDecoration: 'none', color: "inherit" }}>
          <Typography variant='h6' component='div'> MOVIE APP</Typography>
        </Link>
        <Stack direction='row' spacing={2}>
          {loggedUser && loggedUser?.isLoggedIn ? (
            <CustomButton
              style={{
                color: 'inherit',
              }}
              onClick={() => {
                dispatch(logout());
              }}
              children={"LOG OUT"}
            />
          ) : (
<AuthModal  open={open} handleClickOpen={handleClickOpen} handleClose={handleClose}/>
          )}
        </Stack>
      </NavBar>

      <Box
        sx={{
          padding: '7%',
          width: '95%',
          height:'100%',
          margin:'0 auto',
          position: 'relative',
        }}
      >
         <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(/heroes.jpg)`, 
            backgroundSize:'cover',
            opacity: 0.4, 
            zIndex: -1,
          }}
        ></Box>
<Box sx={{
    display: "grid",
    gridTemplateColumns: "50% 50%",
    gap: '10%',
    width: '100%',
    height:'100%',
    alignItems: 'center',
    justifyContent:'space-between',

}}>
         
        <Box sx={{display:'grid',gap:5,width:'100%'}}>
<Box sx={{display:'flex',gap:'15%',alignItems:'center'}}>
<Typography variant='h6' component='p' style={{ fontSize: handleMovieDetailsFontSizeByLength(movieById?.Title?.length), fontWeight: 600 }}>{`${movieById?.Title}   (${movieById?.Year})`}</Typography>
<Typography variant='h6' component='p' style={{ fontSize: '150%'}}>{`${movieById?.Type}`}</Typography>
 
</Box>
           <Box style={{ display: 'flex', gap: '5%', alignItems: 'center', }}>
            {movieById?.Runtime ==="N/A" ?
            <MovieDetailItem fontSize="150%" value={'Not shown'} />
            :  
            <MovieDetailItem fontSize="150%" value={movieById?.Runtime} />
          }
            <VerticalBar/>
            <MovieDetailItem fontSize="150%"     value={movieById?.Genre} />
            <VerticalBar/>
            <MovieDetailItem fontSize="150%" value={movieById?.Released} />
          </Box>
          <Box  sx={{
            width:'90%', letterSpacing: "20px"
          }}>
            <MovieDetailItem fontSize="150%" value={movieById?.Plot} letterSpacing={"1.5px"}/>
          </Box>
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
              <Box sx={{display:'flex',gap:1,flexDirection:'column'}}>
            <MovieDetailItem fontSize="150%" value={movieById?.Actors} description='Actors:  ' />
            <LongTextComponent text={movieById?.Writer} maxWidth="500px" fontSize={'150%'} description='Writers:  '/>
            <MovieDetailItem fontSize="150%" value={movieById?.Country} letterSpacing={"1.5px"}description='Country:  '/>
            <MovieDetailItem fontSize="150%" value={movieById?.Language} letterSpacing={"1.5px"}description='Language:  '/>
              </Box>
  <RatingCircularProgress fontSize="250%" rating={movieById?.imdbRating} percentage={percentage} size={150} thickness={5} />
</Box>
        </Box>
        <Box sx={{ padding: 1.2, borderRadius: 2, width: '50%' }}>
          <Card >
            {movieById?.Poster !== "N/A" && (
              <CardMedia
                image={movieById?.Poster}
                title={movieById?.Title}
                component="img"
                sx={{psoition:'absolute',objectFit: 'contain',}}
                />
                )}
          </Card>
                </Box>
        </Box>
      </Box>

    </Box>
  );
};

export default MovieDetails;
