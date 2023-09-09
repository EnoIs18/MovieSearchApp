import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectLoggedUser } from "../../data/store/userSlice";
import CustomButton from "../CustomButton/CustomButton";
import Login from "../Login/Login";
import FavoriteMovieItem from "../FavoriteMovieItem/FavoriteMovieItem";

interface MoviesBySearchProps {
  movies: any[];
}

const FavoriteMovieItems = ({ movies }: MoviesBySearchProps) => {
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
        <Login />
      )}
      {movies?.map((movie, index) => (
        <FavoriteMovieItem key={index} movie={movie} />
      ))}
    </>
  );
};

export default FavoriteMovieItems;
