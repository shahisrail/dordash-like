// src/Redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { authApi } from "./features/auth/authApi";
import { adminApi } from "./features/admin/adminApi";
import { restaurantApi } from "./features/resturent/resturentApi";
 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer, // ✅ add
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      adminApi.middleware,
      restaurantApi.middleware // ✅ add
    ),
});
