import React, { useState, useEffect } from "react";
import MovieItem from "./MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectLoggedUser } from "../../data/store/userSlice";
import CustomButton from "../CustomButton/CustomButton";
import Login from "../Login/Login";
import BasicTabs from "../TabPanel/CustomTabPanel";

interface MoviesBySearchProps {
  movies: any[];
}

const MoviesBySearch = ({ movies }: MoviesBySearchProps) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectLoggedUser);
  return (
    <>
      {loggedUser && loggedUser?.isLoggedIn ? (
        <CustomButton
          onClick={() => {
            dispatch(logout());
          }}
          children={"LOG OUT"}
        />
      ) : (
        <><BasicTabs /><Login /></>
      )}
      {movies?.map((movie, index) => (
        <MovieItem key={index} movie={movie} />
      ))}
    </>
  );
};

export default MoviesBySearch;
