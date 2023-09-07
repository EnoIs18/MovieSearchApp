import { createSlice, createSelector } from "@reduxjs/toolkit";
import { omdApi } from "../endpoints/app.endpoints";
import { RootState } from "./store";

export interface landingPageMoviesProps {
  landingPageMovies: any;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: landingPageMoviesProps = {
  landingPageMovies: [],
  isLoading: true,
  error: undefined,
};

const selectSelf: any = (state: RootState) => state.landingPageMovies;

export const selectLandingState = createSelector(selectSelf, (state) => state);

export const landingPageMoviesSlice = createSlice({
  name: "landingPageMovies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        omdApi.endpoints.getLandingPageMoviesByID.matchFulfilled,
        (state, { payload }) => {
          state.landingPageMovies = [...state.landingPageMovies, payload];
          state.isLoading = false;
          state.error = undefined;
        }
      )
      .addMatcher(
        omdApi.endpoints.getLandingPageMoviesByID.matchPending,
        (state) => {
          return {
            ...state,
            isLoading: true,
            error: undefined,
          };
        }
      )
      .addMatcher(
        omdApi.endpoints.getLandingPageMoviesByID.matchRejected,
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

export default landingPageMoviesSlice.reducer;
