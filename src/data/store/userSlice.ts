import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: any = {
  users: [
    {
      username: "test",
      password: "1234",
      isLoggedIn: false,
      favorites: [],
    },
    {
      username: "test2",
      password: "1234",
      isLoggedIn: false,
      favorites: [],
    },
    {
      username: "test3",
      password: "1234",
      isLoggedIn: false,
      favorites: [],
    },
  ],
  currentPage: 1,
};
const selectSelf: any = (state: RootState) => state.reducer.user;

export const selectUsersState = createSelector(selectSelf, (state) => state);

export const selectCurrentPage = createSelector(
  selectSelf,
  (state) => state.currentPage
);

export const selectLoggedUser = createSelector(selectSelf, (state) =>
  state.users?.find((user: any) => {
    return user?.isLoggedIn;
  })
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const { movie } = action.payload;

      const user = state.users.find((u: any) => u.isLoggedIn);
      if (user) {
        user.favorites.push(movie);
      }
    },
    removeFavorite: (state, action) => {
      const { movie } = action.payload;

      const user = state.users.find((u: any) => u.isLoggedIn);
      if (user) {
        user.favorites = user.favorites.filter(
          (id: any) => id.imdbID !== movie.imdbID
        );
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    createUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    logout: (state) => {
      const updatedUsers = state?.users?.map((user: any) => {
        return { ...user, isLoggedIn: false };
      });

      return { ...state, users: updatedUsers };
    },
    login: (state, action) => {
      // Find the user to be logged in
      const userToLogin = state?.users?.find((user: any) => {
        return (
          user.username === action.payload.username &&
          user.password === action.payload.password
        );
      });

      if (userToLogin) {
        const updatedUsers = state?.users?.map((user: any) => {
          if (user.username === userToLogin.username) {
            return { ...user, isLoggedIn: true };
          }
          return { ...user, isLoggedIn: false };
        });

        return { ...state, users: updatedUsers, currentPage: 1 };
      }

      return state;
    },
  },
});

export const { addFavorite, removeFavorite, logout, login, setCurrentPage } =
  userSlice.actions;

export default userSlice.reducer;
