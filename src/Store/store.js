import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice";
import { apiSlice } from "../Slice/apiSlice";
import { authApi } from "../Api/authapi";
import { catalogApi } from "../Api/catalogApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(authApi.middleware)
      .concat(catalogApi.middleware),
});
