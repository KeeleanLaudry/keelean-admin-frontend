import { configureStore } from "@reduxjs/toolkit";

import { api } from "../Api/authapi";
import { catalogApi } from "../Api/catalogApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      catalogApi.middleware
    ),
});