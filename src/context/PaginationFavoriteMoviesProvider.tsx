import React, { useState, ReactNode, useEffect } from "react";
import { Context } from "./Context";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectMoviesState } from "../data/store/moviesByTitleSlice";
import { useLazyGetMoviesByTitleQuery } from "../data/endpoints/app.endpoints";
import {
  selectCurrentPage,
  selectFavoriteCurrentPage,
  selectLoggedUser,
  setCurrentPage,
  setFavoriteMoviesCurrentPage,
} from "../data/store/userSlice";
import { useParams } from "react-router";
import { FavoriteMoviesContext } from "./FavoriteMoviesContext";

type ProviderProps = {
  children: ReactNode;
};

const PaginationFavoriteProvider = ({ children }: ProviderProps) => {
  const dispatch = useDispatch();

  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const currentPage = useSelector(selectFavoriteCurrentPage);
console.log(currentPage);

  const handlePageChange = (event: any, newPage: any) => {
    dispatch(setFavoriteMoviesCurrentPage(newPage));
  };

  //favorites movies
  const loggedUser = useSelector(selectLoggedUser);

  const count = Math.ceil(
    loggedUser?.favorites?.length / itemsPerPage
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = loggedUser?.favorites?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <FavoriteMoviesContext.Provider
      value={{
        currentMovies,
        setSearchText,
        searchText,
        currentPage,
      }}
    >
      {children}
      {count > 1 ? (
        <Pagination
          count={count}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      ) : null}
    </FavoriteMoviesContext.Provider>
  );
};

export default PaginationFavoriteProvider;
