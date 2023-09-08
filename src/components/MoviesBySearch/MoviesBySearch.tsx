import React, { useState, useEffect } from "react";
import MovieItem from "./MovieItem";
import { useDispatch } from "react-redux";
import { login } from "../../data/store/userSlice";
import CustomButton from "../CustomButton/CustomButton";

interface MoviesBySearchProps {
  movies: any[];
}

const MoviesBySearch = ({ movies }: MoviesBySearchProps) => {
  const dispatch = useDispatch();

  return (
    <>
      {movies?.map((movie, index) => (
        <MovieItem key={index} movie={movie} />
      ))}
      <CustomButton
        children={"Click"}
        onClick={() => dispatch(login({ username: "test", password: "1234" }))}
      />
    </>
  );
};

export default MoviesBySearch;
