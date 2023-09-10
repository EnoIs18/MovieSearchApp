import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
interface IMDbRatingCircularProgressProps {
    rating: number | string;
    percentage: number; 
    size?: number;
    thickness?: number;  
    fontSize:string
  }
const RatingCircularProgress = ({ fontSize,rating, percentage, size, thickness }:IMDbRatingCircularProgressProps) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={percentage}
        size={size}
        thickness={thickness}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
      >
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
            color: "inherit", 
            fontSize:fontSize
          }}
        >
          {rating}
        </Typography>
      </Box>
    </Box>
  );
};

export default RatingCircularProgress;
