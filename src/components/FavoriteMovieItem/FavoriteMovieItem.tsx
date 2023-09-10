import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import {
  addFavorite,
  removeFavorite,
  selectLoggedUser,
  setRate,
} from "../../data/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import { handleFontSizeByLength } from "../../shared/handleFontSize";
interface MovieProps {
  movie: any;
}

const FavoriteMovieItem = ({ movie }: MovieProps) => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedUser)


  const isUserFavorite =
    user && user?.favorites?.find((id: any) => id.imdbID === movie.imdbID);

  const handleFavoriteClick = () => {
    if (isUserFavorite) {
      dispatch(removeFavorite({ movie }));
    } else {
      dispatch(addFavorite({ movie }));
    }
  };
  return (
    <Link to={`/movies/favorites/${movie?.imdbID}` } style={{textDecoration: 'none',color: "inherit"}}>
   <Box sx={{ border: '2px solid #ffffff4b', margin: 2, backgroundColor: 'transparent', padding: 1.2,borderRadius:2,width:'100%',  }}>
  <Card sx={{ height: 600, position: 'relative' }}>
    {movie?.Poster !== "N/A" && (
      <CardMedia
        sx={{ height: '80vh' }}
        image={movie?.Poster}
        title={movie?.Title}
      />
    )}

    <Box sx={{backgroundColor:'#080a1aa6',height:150, position: 'absolute',width:'100%', bottom: 0
    , zIndex: 100, display: 'flex', flexDirection: 'column',justifyContent:'space-between'}}>
      <CardContent sx={{display:'flex',flexDirection:'column',gap:1}}>
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Rating
name="simple-controlled"
value={movie?.rating}
onClick={(e)=>{
e.stopPropagation()
}}
onChange={(event, newValue) => {
  dispatch(setRate({favoriteMovie:movie,newValue}))
}}defaultValue={0}
emptyIcon={ <StarBorderIcon sx={{color:'white'}} />}
/>
{movie.rating ===0 ?
     <Typography gutterBottom variant="body2" color="text.secondary"  sx={{ color: 'inherit' ,fontSize: '110%',fontWeight:'700'}}>
<Box  style={{display:'flex',gap:2,justifyContent:'center',}}>
  <StarBorderIcon sx={{color:'white'}} />   No rate
</Box>
         </Typography>
  :
  <Typography gutterBottom variant="body2" color="text.secondary"  sx={{alignItems:'center', color: 'inherit' ,fontSize: '120%',fontWeight:'700'}}>
<Box  style={{display:'flex',gap:2,justifyContent:'center',}}>
<StarRateIcon  sx={{color:'#faaf00'}} /> {movie.rating}
</Box>
        </Typography>
  }   
        </Box>
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

export default FavoriteMovieItem;


