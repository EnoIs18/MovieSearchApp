import { createSlice, createSelector } from "@reduxjs/toolkit";
import { omdApi } from "../endpoints/app.endpoints";
import { RootState } from "./store";

export interface movieByIdProps {
  movieById: {};
  isLoading: boolean;
  error: string | undefined;
}

const initialState: movieByIdProps = {
  movieById: {},
  isLoading: true,
  error: undefined,
};

const selectSelf: any = (state: RootState) => state.reducer.movieById;

export const selectMovieByIDState = createSelector(
  selectSelf,
  (state) => state
);
export const selectIsLoadingState = createSelector(selectSelf, (state) => state.isLoading);

export const movieByIdSlice = createSlice({
  name: "movieById",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        omdApi.endpoints.getMovieById.matchFulfilled,
        (state, { payload }) => {
          state.movieById = payload;
          state.isLoading = false;
          state.error = undefined;
        }
      )
      .addMatcher(omdApi.endpoints.getMovieById.matchPending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: undefined,
        };
      })
      .addMatcher(
        omdApi.endpoints.getMovieById.matchRejected,
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

export default movieByIdSlice.reducer;
