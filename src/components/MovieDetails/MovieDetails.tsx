import React, { useEffect } from "react";
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

const VerticalBar = () => (
  <Box
    style={{
      borderLeft: "3px solid #ffffffd6",
      height: 20,
      marginRight: "10px",
    }}
  />
);

const MovieDetailItem = ({  fontSize,value }:any) => (
  <div>
    <Typography variant="h6" component="p" style={{ fontSize:fontSize, fontWeight: 500, lineHeight: '1.75rem' }}>
      {value}
    </Typography>
  </div>
);

const MovieDetails = () => {
  const { id } = useParams();
  const [getMovieById] = useLazyGetMovieByIdQuery();
  const { movieById } = useSelector(selectMovieByIDState);
  const isLoading = useSelector(selectIsLoadingState)
  const loggedUser = useSelector(selectLoggedUser)
  const dispatch = useDispatch();

console.log(movieById);


  useEffect(() => {
    getMovieById(id);
  }, [id]);

  return (
    <>
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
            <AuthModal />
          )}
        </Stack>
      </NavBar>

      <Box
        sx={{
          padding: 20,
          width: '95%',
          height:'100%',
          margin:'0 auto',
          position: 'relative',
          mt:10,
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
    gap: 20,
    width: '100%',
    height:'100%',
    mt: 20,
    alignItems: 'center',
    justifyContent:'space-between',

}}>
         
        <Box sx={{display:'grid',gap:5,width:'100%'}}>

          <Typography variant='h6' component='p' style={{ fontSize: '210%', fontWeight: 600, lineHeight: '1.75rem' }}>
            {`${movieById?.Title}(${movieById?.Year})`}
          </Typography>
          <Box style={{ display: 'flex', gap: '5%', alignItems: 'center', }}>
            <MovieDetailItem fontSize="150%" value={movieById?.Runtime} />
            <MovieDetailItem fontSize="150%"     value={movieById?.Genre} />
  
            <MovieDetailItem fontSize="150%" value={movieById?.Released} />
          </Box>
          <Box style={{ display: 'flex', gap: '5%', alignItems: 'center', }}>
            <MovieDetailItem fontSize="150%" value={movieById?.Director} />
            <MovieDetailItem fontSize="150%" value={movieById?.Awards} />
            <MovieDetailItem fontSize="150%" value={movieById?.Country} />
          </Box>
          <Box  sx={{
          }}>
            <MovieDetailItem fontSize="150%" value={movieById?.Plot} />
          </Box>
            <MovieDetailItem fontSize="150%"value={movieById?.Actors} />
            <MovieDetailItem fontSize="150%" value={movieById?.Type} />
            <MovieDetailItem fontSize="150%" value={movieById?.Writer} />
            <MovieDetailItem fontSize="150%"  value={movieById?.imdbRating} />
        </Box>

        <Box sx={{ padding: 1.2, borderRadius: 2, width: '50%' }}>
          <Card sx={{ height: 600,width:600 }}>
            {movieById?.Poster !== "N/A" && (
              <CardMedia
                image={movieById?.Poster}
                title={movieById?.Title}
                component="img"
                sx={{psoition:'absolute'}}
                />
                )}
          </Card>
                </Box>
        </Box>
      </Box>

    </>
  );
};

export default MovieDetails;
