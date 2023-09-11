import React, { useState, ReactNode, useEffect } from "react";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavoriteCurrentPage,
  selectLoggedUser,
  setFavoriteMoviesCurrentPage,
} from "../data/store/userSlice";
import { FavoriteMoviesContext } from "./FavoriteMoviesContext";

type ProviderProps = {
  children: ReactNode;
};

const PaginationFavoriteProvider = ({ children }: ProviderProps) => {
  const dispatch = useDispatch();

  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const currentPage = useSelector(selectFavoriteCurrentPage);

  const handlePageChange = (event: any, newPage: any) => {
    dispatch(setFavoriteMoviesCurrentPage(newPage));
  };
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
     size="large"
     color="primary"
     sx={{
       display: 'flex',
justifyContent: 'center',
alignItems: 'center',
marginBottom:10,
position: 'static',
"& .MuiPaginationItem-sizeLarge": {
fontSize: '200%', 
p:5
},
     }}
     />
      ) : null}
    </FavoriteMoviesContext.Provider>
  );
};

export default PaginationFavoriteProvider;
