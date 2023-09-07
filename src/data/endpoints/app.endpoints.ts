// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const omdApi = createApi({
  reducerPath: "omdApi",
  tagTypes: ["MoviesByTitle", "MovieDetails"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.omdbapi.com/" }),
  endpoints: (builder) => ({
    getMoviesByTitle: builder.query<any, any>({
      query: (object: { search: any; page: any }) => ({
        url: `?s=${object.search}&apikey=db0223f4&page=${object.page}`,
        method: "GET",
        providesTags: ["MoviesByTitle"],
      }),
    }),
    getMovieById: builder.query<any, any>({
      query: (id: any) => ({
        url: `?i=${id}&apikey=db0223f4`,
        method: "GET",
        providesTags: ["MovieDetails"],
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetMoviesByTitleQuery, useLazyGetMovieByIdQuery } =
  omdApi;
