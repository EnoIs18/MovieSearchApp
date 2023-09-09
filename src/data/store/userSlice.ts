import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface User {
  username: string;
  password: string;
  isLoggedIn: boolean;
  favorites: any[]; 
  error:any;
  notification:boolean;
  textNotification:string
}
const initialState: any = {
  users: [],
  currentPage: 1,
  favoritesMoviesCurrentPage:1,
  error:undefined,
  notification:false,
  textNotification:''
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

export const SelectAuthError = createSelector(
  selectSelf,
  (state) => state.error
);

export const SelectShowNotification = createSelector(
  selectSelf,
  (state) => state.notification
);
export const SelectTextNotification = createSelector(
  selectSelf,
  (state) => state.textNotification
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
            return { ...favMovie, rating: action.payload.newValue }; 
          }
          return favMovie;
        });
    
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

      const isUserExist = state.users.some((user: User) => user.username === username);

      if (isUserExist) {
        state.error = "Username already exists."; 
        state.notification = true
        state.textNotification=''
        return; 
      }

      state.users = [...state.users, { username, password, isLoggedIn: false, favorites: [], error: undefined }];
      state.notification = true
      state.error = ''
      state.textNotification='User registered successfully'
    
    },
    logout: (state) => {
      const updatedUsers = state?.users?.map((user: User) => {
        
        return { ...user, isLoggedIn: false };
      });
      
      return { ...state, users: updatedUsers };
    },
    login: (state, action) => {
        const userToLogin = state?.users?.find((user: User) => {
          return (
            user.username === action.payload.username &&
            user.password === action.payload.password
          );
        });
  
        if (!userToLogin) {
          state.error = "Invalid username or password.";
          state.notification = true
          state.textNotification=''
          return; 
        }
  
        const updatedUsers = state?.users?.map((user: User) => {
          if (user.username === userToLogin.username) {
          state.notification = true
      state.error = ''
       state.textNotification='User logged in successfully'

            
            return { ...user, isLoggedIn: true, error: undefined };
          }
          return { ...user, isLoggedIn: false, error: undefined };
        });
  
        state.users = updatedUsers;
        state.currentPage = 1;
        state.favoritesMoviesCurrentPage = 1;
      },
      setNotification: (state, action) => {
        state.notification = action.payload
        state.error = ''
        state.textNotification=''
         },
    },
    
});

export const { addFavorite, removeFavorite,setRate,setNotification,logout,register, login, setCurrentPage,setFavoriteMoviesCurrentPage } =
  userSlice.actions;

export default userSlice.reducer;
