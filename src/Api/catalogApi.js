import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const catalogApi = createApi({
  reducerPath: "catalogApi",

  baseQuery: fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/admin/catalog/",

    
    prepareHeaders: (headers, { getState }) => {

      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Service", "Item", "AttributeType", "AttributeOption"],

  endpoints: (builder) => ({
    
    // ==============================
    // SERVICES
    // ==============================

    getServices: builder.query({
      query: () => "services/",
      providesTags: ["Service"],
    }),

    createService: builder.mutation({
      query: (data) => ({
        url: "services/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    updateService: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `services/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `services/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),

    // ==============================
    // ITEMS
    // ==============================

    getItems: builder.query({
      query: () => "items/",
      providesTags: ["Item"],
    }),

    createItem: builder.mutation({
      query: (data) => ({
        url: "items/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Item"],
    }),

    updateItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `items/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Item"],
    }),

    deleteItem: builder.mutation({
      query: (id) => ({
        url: `items/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),

    // ==============================
    // ATTRIBUTE TYPES
    // ==============================

    getAttributeTypes: builder.query({
      query: () => "attribute-types/",
      providesTags: ["AttributeType"],
    }),

    createAttributeType: builder.mutation({
      query: (data) => ({
        url: "attribute-types/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AttributeType"],
    }),

    updateAttributeType: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `attribute-types/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AttributeType"],
    }),

    deleteAttributeType: builder.mutation({
      query: (id) => ({
        url: `attribute-types/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["AttributeType"],
    }),

    // ==============================
    // ATTRIBUTE OPTIONS
    // ==============================

    getAttributeOptions: builder.query({
      query: () => "attribute-options/",
      providesTags: ["AttributeOption"],
    }),

    createAttributeOption: builder.mutation({
      query: (data) => ({
        url: "attribute-options/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AttributeOption"],
    }),

    updateAttributeOption: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `attribute-options/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AttributeOption"],
    }),

    deleteAttributeOption: builder.mutation({
      query: (id) => ({
        url: `attribute-options/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["AttributeOption"],
    }),

  }),
});

export const {

  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,

  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,

  useGetAttributeTypesQuery,
  useCreateAttributeTypeMutation,
  useUpdateAttributeTypeMutation,
  useDeleteAttributeTypeMutation,

  useGetAttributeOptionsQuery,
  useCreateAttributeOptionMutation,
  useUpdateAttributeOptionMutation,
  useDeleteAttributeOptionMutation,

} = catalogApi;