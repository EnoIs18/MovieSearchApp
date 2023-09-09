import React, { useState, ReactNode, useEffect } from "react";
import { Context } from "./Context";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectMoviesState } from "../data/store/moviesByTitleSlice";
import { useLazyGetMoviesByTitleQuery } from "../data/endpoints/app.endpoints";
import {
  selectCurrentPage,
  selectLoggedUser,
  setCurrentPage,
} from "../data/store/userSlice";
import { useParams } from "react-router";

type ProviderProps = {
  children: ReactNode;
};

const PaginationProvider = ({ children }: ProviderProps) => {
  const dispatch = useDispatch();
  const [getMovies] = useLazyGetMoviesByTitleQuery();

  const itemsPerPage = 10;
  const movies = useSelector(selectMoviesState);
  const currentMovies = movies?.moviesByTitle?.Search;

  const [searchText, setSearchText] = useState("");
  const currentPage = useSelector(selectCurrentPage);

  const handlePageChange = (event: any, newPage: any) => {
    dispatch(setCurrentPage(newPage));
  };
  const count = Math.ceil(movies?.moviesByTitle?.totalResults / itemsPerPage);

  //favorites movies
  const loggedUser = useSelector(selectLoggedUser);

  const params = useParams();
  console.log(params, "paramss");

  const currentFavoriteMovies = loggedUser?.favorites;
  const countForFavorites = Math.ceil(
    loggedUser?.favorites?.length / itemsPerPage
  );

  useEffect(() => {
    getMovies({
      search: !searchText.length ? "Batman" : searchText,
      page: currentPage,
    });
  }, [currentPage]);

  return (
    <Context.Provider
      value={{
        currentMovies,
        setSearchText,
        getMovies,
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
    </Context.Provider>
  );
};

export default PaginationProvider;
