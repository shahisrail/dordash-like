import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/admin",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Restaurants"],
  endpoints: (builder) => ({
    addRestaurant: builder.mutation({
      query: (restaurantData) => ({
        url: "/restaurants",
        method: "POST",
        body: restaurantData,
      }),
      invalidatesTags: ["Restaurants"],
    }),

    getAllRestaurants: builder.query({
      query: () => "/restaurants",
      providesTags: ["Restaurants"],
    }),

    getRestaurantById: builder.query({
      query: (id) => `/restaurants/${id}`,
      providesTags: (result, error, id) => [{ type: "Restaurants", id }],
    }),

    updateRestaurant: builder.mutation({
      query: ({ id, data }) => ({
        url: `/restaurants/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Restaurants",
        { type: "Restaurants", id },
      ],
    }),

    deleteRestaurant: builder.mutation({
      query: (id) => ({
        url: `/restaurants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Restaurants",
        { type: "Restaurants", id },
      ],
    }),
    getAllUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

export const {
  useAddRestaurantMutation,
  useGetAllRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation,
  useGetAllUsersQuery,
} = adminApi;
