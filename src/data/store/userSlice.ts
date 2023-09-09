import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface User {
  username: string;
  password: string;
  isLoggedIn: boolean;
  favorites: any[]; // You can define the type of favorites more precisely if needed
  error:any
}
const initialState: any = {
  users: [],
  currentPage: 1,
  favoritesMoviesCurrentPage:1,
  error:undefined
};
const selectSelf: any = (state: RootState) => state.reducer.user;

export const selectUsersState = createSelector(selectSelf, (state) => state);

export const selectCurrentPage = createSelector(
  selectSelf,
  (state) => state.currentPage
);


export const selectFavoriteCurrentPage = createSelector(
  selectSelf,
  (state) => state.favoritesMoviesCurrentPage
);

export const catchAuthError = createSelector(
  selectSelf,
  (state) => state.error
);
export const selectLoggedUser = createSelector(selectSelf, (state) =>
  state.users?.find((user: User) => {
    return user?.isLoggedIn;
  })
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const { movie } = action.payload;

      const user = state.users.find((u: User) => u.isLoggedIn);
      if (user) {
        user.favorites.push({...movie,rating:0});
      }
    },
    removeFavorite: (state, action) => {
      const { movie } = action.payload;

      const user = state.users.find((u: User) => u.isLoggedIn);
      if (user) {
        user.favorites = user.favorites.filter(
          (id: any) => id.imdbID !== movie.imdbID
        );
      }
    },
    setRate:(state,action)=>{
      
      const user = state.users.find((u: User) => u.isLoggedIn);
      if (user) {
        const updatedFavorites = user.favorites.map((favMovie: any) => {
          if (favMovie.imdbID === action.payload.favoriteMovie.imdbID) {
            // Update the rating for the specific movie
            return { ...favMovie, rating: action.payload.newValue }; // Use newValue here
          }
          return favMovie;
        });
    
        // Update the user's favorites with the updated array
        user.favorites = updatedFavorites;
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFavoriteMoviesCurrentPage: (state, action) => {
      state.favoritesMoviesCurrentPage = action.payload;
    },
    register: (state, action) => {
      const { username, password } = action.payload;

      // Check if the username already exists in the initial state
      const isUserExist = state.users.some((user: User) => user.username === username);

      if (isUserExist) {
        state.error = "Username already exists."; // Set error message
        return; // Exit early, don't modify state further
      }

      state.users = [...state.users, { username, password, isLoggedIn: false, favorites: [], error: undefined }];
    },
    logout: (state) => {
      const updatedUsers = state?.users?.map((user: User) => {
        return { ...user, isLoggedIn: false };
      });

      return { ...state, users: updatedUsers };
    },
    login: (state, action) => {
        // Find the user to be logged in
        const userToLogin = state?.users?.find((user: User) => {
          return (
            user.username === action.payload.username &&
            user.password === action.payload.password
          );
        });
  
        if (!userToLogin) {
          state.error = "Invalid username or password."; // Set error message
          return; // Exit early, don't modify state further
        }
  
        const updatedUsers = state?.users?.map((user: User) => {
          if (user.username === userToLogin.username) {
            return { ...user, isLoggedIn: true, error: undefined };
          }
          return { ...user, isLoggedIn: false, error: undefined };
        });
  
        state.users = updatedUsers;
        state.currentPage = 1;
        state.favoritesMoviesCurrentPage = 1;
      },
    },
});

export const { addFavorite, removeFavorite,setRate, logout,register, login, setCurrentPage,setFavoriteMoviesCurrentPage } =
  userSlice.actions;

export default userSlice.reducer;
