import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addFavorite,
  removeFavorite,
  selectLoggedUser,
} from "../../data/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import { handleFontSizeByLength } from "../../shared/handleFontSize";
import { Context } from "../../context/Context";
interface MovieProps {
  movie: any;
}

const MovieItem = ({ movie }: MovieProps) => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedUser)
const {setOpenModal}= useContext(Context)

  const isUserFavorite =
    user && user?.favorites?.find((id: any) => id.imdbID === movie.imdbID);

  const handleFavoriteClick = () => {
    if(!user){
      setOpenModal(true)
      return
    }
    if (isUserFavorite) {
      dispatch(removeFavorite({ movie }));
    } else {
      dispatch(addFavorite({ movie }));
    }
  };
  return (
    <Link to={`/movies/${movie.imdbID}`} style={{textDecoration: 'none',color: "inherit"}}>
<Box sx={{ border: '2px solid #ffffff4b', margin: 2, backgroundColor: 'transparent', padding: 1.2,borderRadius:2,width:'100%',  }}>
  <Card sx={{ height: 900, position: 'relative' }}>
    {movie?.Poster !== "N/A" && (
      <CardMedia
        sx={{ height: 'inherit' }}
        image={movie?.Poster}
        title={movie?.Title}
      />
    )}
    <Box sx={{backgroundColor:'#080a1aa6',height:110, position: 'absolute',width:'100%', bottom: 0
    , zIndex: 100, display: 'flex', flexDirection: 'column',justifyContent:'space-between'}}>
      <CardContent sx={{display:'flex',flexDirection:'column',gap:1}}>
        <Box  sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Typography gutterBottom variant="body2" color="text.secondary"  sx={{ color: 'inherit' ,fontSize: handleFontSizeByLength(movie?.Title?.length),fontWeight:'700'}}>
          {movie?.Title}
        </Typography>
        <CustomButton
        style={{border:`2px solid ${isUserFavorite ? 'red' : '#ffffffd6'}`}}
          onClick={(e) => {
            e.preventDefault();
            handleFavoriteClick();
          }}
        >
          {isUserFavorite ? <FavoriteIcon color="error" fontSize="large"/> : <FavoriteBorderIcon fontSize="large" sx={{color:'#ffffffd6'}} />}
        </CustomButton>
        </Box>
        <Box sx={{display:'flex' ,justifyContent:'space-between',alignItems:'center'}}>
        <Typography variant="body2" color="text.secondary" sx={{ color:'inherit',fontSize:'105%',fontWeight:'700' }}>
          {movie?.Year}
        </Typography>
        <Typography variant="body2" color="text.secondary"  sx={{color:'inherit',fontSize:'105%',fontWeight:'700' ,pr:1}}>
        {movie?.Type}
        </Typography>
        </Box>
      </CardContent>
    </Box>
  </Card>
</Box>

    </Link>
  );
};

export default MovieItem;
