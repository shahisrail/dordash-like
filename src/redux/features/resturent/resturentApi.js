import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/restaurant",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Restaurant", "Menu"],
  endpoints: (builder) => ({
    getMyRestaurant: builder.query({
      query: () => "/me",
      providesTags: ["Restaurant"],
    }),

    updateMyRestaurant: builder.mutation({
      query: (updatedData) => ({
        url: "/me",
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Restaurant"],
    }),

    createCategory: builder.mutation({
      query: (body) => ({
        url: "/menu/category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Menu"],
    }),

    createSubcategory: builder.mutation({
      query: (body) => ({
        url: "/menu/subcategory",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Menu"],
    }),

    createFoodItem: builder.mutation({
      query: (body) => ({
        url: "/menu/food",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Menu"],
    }),

    getMenu: builder.query({
      query: () => "/menu/menu",
      providesTags: ["Menu"],
    }),
    getAllMyfood: builder.query({
      query: () => "/menu/foods",
      providesTags: ["Menu"],
    }),

    getAllCategories: builder.query({
      query: () => "/menu/categories",
      providesTags: ["Menu"],
    }),

    getSubcategoriesByCategory: builder.query({
      query: (categoryId) => `/menu/subcategories/${categoryId}`,
      providesTags: ["Menu"],
    }),
    getFoodItemById: builder.query({
      query: (foodId) => `/menu/food/${foodId}`,
      providesTags: (result, error, id) => [{ type: "Menu", id }],
    }),
    updateFoodItem: builder.mutation({
       
      
      query: ({ foodId, data }) => ({
        // <-- Change this line
        url: `/menu/food/${foodId}`,
        method: "PUT",
        body: data, // <-- Ensure you send the 'data' object as the request body
      }),
      invalidatesTags: ["Menu"],
    }),
    deleteFoodItem: builder.mutation({
      query: (foodId) => ({
        url: `/menu/food/${foodId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menu"],
    }),
  }),
});

export const {
  useGetMyRestaurantQuery,
  useUpdateMyRestaurantMutation,
  useCreateCategoryMutation,
  useCreateSubcategoryMutation,
  useCreateFoodItemMutation,
  useGetMenuQuery,
  useGetAllMyfoodQuery,
  useGetAllCategoriesQuery,
  useGetSubcategoriesByCategoryQuery,
  useUpdateFoodItemMutation,
  useGetFoodItemByIdQuery,
  useDeleteFoodItemMutation,
} = restaurantApi;
