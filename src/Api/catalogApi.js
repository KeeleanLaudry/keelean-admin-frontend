import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const catalogApi = createApi({
  reducerPath: "catalogApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/catalog/", // Our backend base URL

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
    "Category",
    "Subcategory",
    "Item",
    "AttributeType",
    "AttributeOption",
    "DeliveryTier",
    "AddOn",
    "FoldingOption",
    "CustomisationOption",
    "CatalogTree",
  ],

  endpoints: (builder) => ({
    // ==============================
    // 📦 CATALOG TREE (One-Call API)
    // GET /api/catalog/tree/
    // ==============================
    getCatalogTree: builder.query({
      query: () => "tree/",
      providesTags: ["CatalogTree"],
    }),

    // ==============================
    // SERVICES
    // GET /api/catalog/services/
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
      invalidatesTags: ["Service", "CatalogTree"],
    }),
    updateService: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `services/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Service", "CatalogTree"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `services/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service", "CatalogTree"],
    }),

    // ==============================
    // CATEGORIES
    // GET /api/catalog/categories/
    // GET /api/catalog/categories/by-service/?service_id=1
    // ==============================
    getCategories: builder.query({
      query: () => "categories/",
      providesTags: ["Category"],
    }),
    getCategoriesByService: builder.query({
      query: (serviceId) => `categories/by-service/?service_id=${serviceId}`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "categories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category", "CatalogTree"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `categories/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category", "CatalogTree"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category", "CatalogTree"],
    }),

    // ==============================
    // SUBCATEGORIES
    // GET /api/catalog/subcategories/
    // GET /api/catalog/subcategories/by-category/?category_id=1
    // GET /api/catalog/subcategories/by-service-category/?service_id=1&category_id=2
    // ==============================
    getSubcategories: builder.query({
      query: () => "subcategories/",
      providesTags: ["Subcategory"],
    }),
    getSubcategoriesByCategory: builder.query({
      query: (categoryId) =>
        `subcategories/by-category/?category_id=${categoryId}`,
      providesTags: ["Subcategory"],
    }),
    getSubcategoriesByServiceCategory: builder.query({
      query: ({ serviceId, categoryId }) =>
        `subcategories/by-service-category/?service_id=${serviceId}&category_id=${categoryId}`,
      providesTags: ["Subcategory"],
    }),
    createSubcategory: builder.mutation({
      query: (data) => ({
        url: "subcategories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subcategory", "CatalogTree"],
    }),
    updateSubcategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `subcategories/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Subcategory", "CatalogTree"],
    }),
    deleteSubcategory: builder.mutation({
      query: (id) => ({
        url: `subcategories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subcategory", "CatalogTree"],
    }),

    // ==============================
    // ITEMS
    // GET /api/catalog/items/
    // GET /api/catalog/items/?service_id=1&category_id=2&subcategory_id=3
    // GET /api/catalog/items/filtered/?service_id=1&category_id=2&subcategory_id=3
    // ==============================
    getItems: builder.query({
      query: () => "items/",
      providesTags: ["Item"],
    }),
    getItemsFiltered: builder.query({
      query: ({ serviceId, categoryId, subcategoryId }) => {
        const params = new URLSearchParams();
        if (serviceId) params.append("service_id", serviceId);
        if (categoryId) params.append("category_id", categoryId);
        if (subcategoryId) params.append("subcategory_id", subcategoryId);
        return `items/filtered/?${params.toString()}`;
      },
      providesTags: ["Item"],
    }),
    createItem: builder.mutation({
      query: (data) => ({
        url: "items/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Item", "CatalogTree"],
    }),
    updateItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `items/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Item", "CatalogTree"],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `items/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item", "CatalogTree"],
    }),

    // ==============================
    // ATTRIBUTE TYPES
    // GET /api/catalog/attribute-types/
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
      invalidatesTags: ["AttributeType", "CatalogTree"],
    }),
    updateAttributeType: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `attribute-types/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AttributeType", "CatalogTree"],
    }),
    deleteAttributeType: builder.mutation({
      query: (id) => ({
        url: `attribute-types/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["AttributeType", "CatalogTree"],
    }),

    // ==============================
    // ATTRIBUTE OPTIONS
    // GET /api/catalog/attribute-options/
    // GET /api/catalog/attribute-options/?attribute_type_id=1
    // ==============================
    getAttributeOptions: builder.query({
      query: (attributeTypeId) =>
        attributeTypeId
          ? `attribute-options/?attribute_type_id=${attributeTypeId}`
          : "attribute-options/",
      providesTags: ["AttributeOption"],
    }),
    createAttributeOption: builder.mutation({
      query: (data) => ({
        url: "attribute-options/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AttributeOption", "CatalogTree"],
    }),
    updateAttributeOption: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `attribute-options/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AttributeOption", "CatalogTree"],
    }),
    deleteAttributeOption: builder.mutation({
      query: (id) => ({
        url: `attribute-options/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["AttributeOption", "CatalogTree"],
    }),

    // ==============================
    // DELIVERY TIERS
    // GET /api/catalog/delivery-tiers/
    // ==============================
    getDeliveryTiers: builder.query({
      query: () => "delivery-tiers/",
      providesTags: ["DeliveryTier"],
    }),
    createDeliveryTier: builder.mutation({
      query: (data) => ({
        url: "delivery-tiers/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DeliveryTier", "CatalogTree"],
    }),
    updateDeliveryTier: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `delivery-tiers/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["DeliveryTier", "CatalogTree"],
    }),
    deleteDeliveryTier: builder.mutation({
      query: (id) => ({
        url: `delivery-tiers/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeliveryTier", "CatalogTree"],
    }),

    // ==============================
    // ADD-ONS
    // GET /api/catalog/addons/
    // ==============================
    getAddOns: builder.query({
      query: () => "addons/",
      providesTags: ["AddOn"],
    }),
    createAddOn: builder.mutation({
      query: (data) => ({
        url: "addons/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AddOn", "CatalogTree"],
    }),
    updateAddOn: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `addons/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AddOn", "CatalogTree"],
    }),
    deleteAddOn: builder.mutation({
      query: (id) => ({
        url: `addons/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["AddOn", "CatalogTree"],
    }),

    // ==============================
    // FOLDING OPTIONS
    // GET /api/catalog/folding-options/
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
      invalidatesTags: ["FoldingOption", "CatalogTree"],
    }),
    updateFoldingOption: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `folding-options/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FoldingOption", "CatalogTree"],
    }),
    deleteFoldingOption: builder.mutation({
      query: (id) => ({
        url: `folding-options/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["FoldingOption", "CatalogTree"],
    }),

    // ==============================
    // CUSTOMISATION OPTIONS
    // GET /api/catalog/customisation-options/
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
      invalidatesTags: ["CustomisationOption", "CatalogTree"],
    }),
    updateCustomisationOption: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `customisation-options/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CustomisationOption", "CatalogTree"],
    }),
    deleteCustomisationOption: builder.mutation({
      query: (id) => ({
        url: `customisation-options/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["CustomisationOption", "CatalogTree"],
    }),
  }),
});

// ==============================
// EXPORTED HOOKS
// ==============================
export const {
  // Catalog Tree
  useGetCatalogTreeQuery,

  // Services
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,

  // Categories
  useGetCategoriesQuery,
  useGetCategoriesByServiceQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  // Subcategories
  useGetSubcategoriesQuery,
  useGetSubcategoriesByCategoryQuery,
  useGetSubcategoriesByServiceCategoryQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,

  // Items
  useGetItemsQuery,
  useGetItemsFilteredQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,

  // Attribute Types
  useGetAttributeTypesQuery,
  useCreateAttributeTypeMutation,
  useUpdateAttributeTypeMutation,
  useDeleteAttributeTypeMutation,

  // Attribute Options
  useGetAttributeOptionsQuery,
  useCreateAttributeOptionMutation,
  useUpdateAttributeOptionMutation,
  useDeleteAttributeOptionMutation,

  // Delivery Tiers
  useGetDeliveryTiersQuery,
  useCreateDeliveryTierMutation,
  useUpdateDeliveryTierMutation,
  useDeleteDeliveryTierMutation,

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
} = catalogApi;
