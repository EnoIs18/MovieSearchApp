import React, { useEffect, useState } from "react";
import "./App.css";
import {
  useLazyGetLandingPageMoviesByIDQuery,
  useLazyGetMoviesByTitleQuery,
} from "./data/endpoints/app.endpoints";
import { selectMoviesState } from "./data/store/moviesByTitleSlice";
import { useSelector } from "react-redux";
import { Box, Button, Pagination, TextField } from "@mui/material";
function App() {
  const [getMovies] = useLazyGetMoviesByTitleQuery();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page

  // Replace this with your actual data fetching logic
  const movies = useSelector(selectMoviesState);

  // Calculate the range of movies to display for the current page
  const currentItems = movies?.moviesByTitle?.Search;
  const handlePageChange = (event: any, newPage: any) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getMovies({ search: searchText, page: currentPage });
  }, [currentPage]);

  return (
    <Box sx={{ padding: 5 }}>
      <TextField
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        label={""}
        variant="outlined"
      />
      <Button
        onClick={() => {
          getMovies({ search: searchText, page: currentPage });
        }}
      >
        Search
      </Button>
      <Box sx={{ display: "grid", gridTemplateColumns: "30% 30% 30%", gap: 5 }}>
        {/* Render your movie items here */}
        {currentItems?.map((movie: any, index: any) => (
          <div key={index}>
            {/* Replace this with your movie item rendering logic */}
            <h3>{movie.Title}</h3>
            <p>Type: {movie.Type}</p>
            <p>Year: {movie.Year}</p>
            <p>IMDb ID: {movie.imdbID}</p>
            {movie.Poster !== "N/A" && (
              <img
                src={movie.Poster}
                alt={movie.Title}
                width={150}
                height={150}
                loading="lazy"
              />
            )}
          </div>
        ))}
      </Box>
      <Pagination
        count={Math.ceil(movies?.moviesByTitle?.totalResults / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
      />
    </Box>
  );
}

export default App;
