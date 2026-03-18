import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/accounts/",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json")
      return headers
    },
  }),

  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "admin/login/",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const { useAdminLoginMutation } = authApi