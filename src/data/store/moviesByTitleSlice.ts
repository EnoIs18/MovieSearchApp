import { createSlice, createSelector } from "@reduxjs/toolkit";
import { omdApi } from "../endpoints/app.endpoints";
import { RootState } from "./store";

export interface MoviesByTitleProps {
  moviesByTitle: [];
  favorites: [];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: MoviesByTitleProps = {
  moviesByTitle: [],
  isLoading: true,
  error: undefined,
  favorites: [],
};

  const selectSelf: any = (state: RootState) => state.reducer.moviesByTitle;

export const selectMoviesState = createSelector(selectSelf, (state) => state);
export const selectIsLoadingState = createSelector(selectSelf, (state) => state.isLoading);

export const moviesByTitleSlice = createSlice({
  name: "moviesByTitle",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        omdApi.endpoints.getMoviesByTitle.matchFulfilled,
        (state, { payload }) => {
          state.moviesByTitle = payload;
          state.isLoading = false;
          state.error = undefined;
        }
      )
      .addMatcher(omdApi.endpoints.getMoviesByTitle.matchPending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: undefined,
        };
      })
      .addMatcher(
        omdApi.endpoints.getMoviesByTitle.matchRejected,
        (state, action) => {
          return {
            ...state,
            isLoading: false,
            error: action.error.message,
          };
        }
      );
  },
});

export default moviesByTitleSlice.reducer;
