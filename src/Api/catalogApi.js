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

  tagTypes: [
    "Service",
    "Item",
    "AttributeType",
    "AttributeOption",
    // new
    "AddOn",
    "FoldingOption",
    "CustomisationOption",
    "ItemAddOn",
    "ItemFolding",
    "ItemCustomisation",
  ],

  endpoints: (builder) => ({
    // ==============================
    // SERVICES
    // ==============================

    getServices: builder.query({
      query: () => "services/",
      providesTags: ["Service"],
    }),
    createService: builder.mutation({
      query: (data) => ({ url: "services/", method: "POST", body: data }),
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
      query: (id) => ({ url: `services/${id}/`, method: "DELETE" }),
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
      query: (data) => ({ url: "items/", method: "POST", body: data }),
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
      query: (id) => ({ url: `items/${id}/`, method: "DELETE" }),
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
      query: (id) => ({ url: `attribute-types/${id}/`, method: "DELETE" }),
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
      query: (id) => ({ url: `attribute-options/${id}/`, method: "DELETE" }),
      invalidatesTags: ["AttributeOption"],
    }),

    // ==============================
    // ADD-ONS  (admin manages)
    // ==============================

    getAddOns: builder.query({
      query: () => "addons/",
      providesTags: ["AddOn"],
    }),
    createAddOn: builder.mutation({
      query: (data) => ({ url: "addons/", method: "POST", body: data }),
      invalidatesTags: ["AddOn"],
    }),
    updateAddOn: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `addons/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AddOn"],
    }),
    deleteAddOn: builder.mutation({
      query: (id) => ({ url: `addons/${id}/`, method: "DELETE" }),
      invalidatesTags: ["AddOn"],
    }),

    // ==============================
    // FOLDING OPTIONS  (admin manages)
    // ==============================

    getFoldingOptions: builder.query({
      query: () => "folding-options/",
      providesTags: ["FoldingOption"],
    }),
    createFoldingOption: builder.mutation({
      query: (data) => ({
        url: "folding-options/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FoldingOption"],
    }),
    updateFoldingOption: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `folding-options/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FoldingOption"],
    }),
    deleteFoldingOption: builder.mutation({
      query: (id) => ({ url: `folding-options/${id}/`, method: "DELETE" }),
      invalidatesTags: ["FoldingOption"],
    }),

    // ==============================
    // CUSTOMISATION OPTIONS  (admin manages)
    // ==============================

    getCustomisationOptions: builder.query({
      query: () => "customisation-options/",
      providesTags: ["CustomisationOption"],
    }),
    createCustomisationOption: builder.mutation({
      query: (data) => ({
        url: "customisation-options/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CustomisationOption"],
    }),
    updateCustomisationOption: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `customisation-options/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CustomisationOption"],
    }),
    deleteCustomisationOption: builder.mutation({
      query: (id) => ({
        url: `customisation-options/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["CustomisationOption"],
    }),

    // ==============================
    // ITEM ADD-ONS  (vendor links)
    // ==============================

    getItemAddOns: builder.query({
      query: (itemTypeId) =>
        `item-addons/${itemTypeId ? `?item_type=${itemTypeId}` : ""}`,
      providesTags: ["ItemAddOn"],
    }),
    createItemAddOn: builder.mutation({
      query: (data) => ({ url: "item-addons/", method: "POST", body: data }),
      invalidatesTags: ["ItemAddOn"],
    }),
    deleteItemAddOn: builder.mutation({
      query: (id) => ({ url: `item-addons/${id}/`, method: "DELETE" }),
      invalidatesTags: ["ItemAddOn"],
    }),

    // ==============================
    // ITEM FOLDINGS  (vendor links)
    // ==============================

    getItemFoldings: builder.query({
      query: (itemTypeId) =>
        `item-foldings/${itemTypeId ? `?item_type=${itemTypeId}` : ""}`,
      providesTags: ["ItemFolding"],
    }),
    createItemFolding: builder.mutation({
      query: (data) => ({ url: "item-foldings/", method: "POST", body: data }),
      invalidatesTags: ["ItemFolding"],
    }),
    deleteItemFolding: builder.mutation({
      query: (id) => ({ url: `item-foldings/${id}/`, method: "DELETE" }),
      invalidatesTags: ["ItemFolding"],
    }),

    // ==============================
    // ITEM CUSTOMISATIONS  (vendor links)
    // ==============================

    getItemCustomisations: builder.query({
      query: (itemTypeId) =>
        `item-customisations/${itemTypeId ? `?item_type=${itemTypeId}` : ""}`,
      providesTags: ["ItemCustomisation"],
    }),
    createItemCustomisation: builder.mutation({
      query: (data) => ({
        url: "item-customisations/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ItemCustomisation"],
    }),
    deleteItemCustomisation: builder.mutation({
      query: (id) => ({ url: `item-customisations/${id}/`, method: "DELETE" }),
      invalidatesTags: ["ItemCustomisation"],
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

  // Add-ons
  useGetAddOnsQuery,
  useCreateAddOnMutation,
  useUpdateAddOnMutation,
  useDeleteAddOnMutation,

  // Folding options
  useGetFoldingOptionsQuery,
  useCreateFoldingOptionMutation,
  useUpdateFoldingOptionMutation,
  useDeleteFoldingOptionMutation,

  // Customisation options
  useGetCustomisationOptionsQuery,
  useCreateCustomisationOptionMutation,
  useUpdateCustomisationOptionMutation,
  useDeleteCustomisationOptionMutation,

  // Item add-ons (vendor)
  useGetItemAddOnsQuery,
  useCreateItemAddOnMutation,
  useDeleteItemAddOnMutation,

  // Item foldings (vendor)
  useGetItemFoldingsQuery,
  useCreateItemFoldingMutation,
  useDeleteItemFoldingMutation,

  // Item customisations (vendor)
  useGetItemCustomisationsQuery,
  useCreateItemCustomisationMutation,
  useDeleteItemCustomisationMutation,
} = catalogApi;
