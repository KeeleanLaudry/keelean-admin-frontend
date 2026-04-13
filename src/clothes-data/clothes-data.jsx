import DataTable from "../DataTable/dataTable";
import Pagination from "../DataTable/DataPagination";
import React, { useState, useMemo } from "react";
import {
  useGetServicesQuery,
  useCreateServiceMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetSubcategoriesQuery,
  useCreateSubcategoryMutation,
  useGetItemsQuery,
  useCreateItemMutation,
  useGetAttributeTypesQuery,
  useCreateAttributeTypeMutation,
  useGetAttributeOptionsQuery,
  useCreateAttributeOptionMutation,
  useGetDeliveryTiersQuery,
  useCreateDeliveryTierMutation,
  useGetAddOnsQuery,
  useCreateAddOnMutation,
  useGetFoldingOptionsQuery,
  useCreateFoldingOptionMutation,
  useGetCustomisationOptionsQuery,
  useCreateCustomisationOptionMutation,
} from "../Api/catalogApi";

export default function Clothesdata() {
  const [activeTab, setActiveTab] = useState("services");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [newEntry, setNewEntry] = useState("");
  const [description, setDescription] = useState("");

  // For hierarchical selections
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  // For delivery tiers
  const [hoursSla, setHoursSla] = useState("");
  const [surchargeType, setSurchargeType] = useState("pct");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [defaultSurcharge, setDefaultSurcharge] = useState("");

  // For attribute options
  const [surchargePct, setSurchargePct] = useState("0");

  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [serviceImage, setServiceImage] = useState(null);

  // API HOOKS
  const { data: services = [] } = useGetServicesQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: subcategories = [] } = useGetSubcategoriesQuery();
  const { data: items = [] } = useGetItemsQuery();
  const { data: attributes = [] } = useGetAttributeTypesQuery();
  const { data: attributeOptions = [] } = useGetAttributeOptionsQuery();
  const { data: deliveryTiers = [] } = useGetDeliveryTiersQuery();
  const { data: addOns = [] } = useGetAddOnsQuery();
  const { data: foldingOptions = [] } = useGetFoldingOptionsQuery();
  const { data: customisationOptions = [] } = useGetCustomisationOptionsQuery();

  const [createService] = useCreateServiceMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [createSubcategory] = useCreateSubcategoryMutation();
  const [createItem] = useCreateItemMutation();
  const [createAttributeType] = useCreateAttributeTypeMutation();
  const [createAttributeOption] = useCreateAttributeOptionMutation();
  const [createDeliveryTier] = useCreateDeliveryTierMutation();
  const [createAddOn] = useCreateAddOnMutation();
  const [createFoldingOption] = useCreateFoldingOptionMutation();
  const [createCustomisationOption] = useCreateCustomisationOptionMutation();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setServiceImage(URL.createObjectURL(file));
  };

  // ACTIVE TAB → DATA
  let data = [];
  if (activeTab === "services") data = services;
  if (activeTab === "categories") data = categories;
  if (activeTab === "subcategories") data = subcategories;
  if (activeTab === "items") data = items;
  if (activeTab === "attributes") data = attributes;
  if (activeTab === "attributeOptions") data = attributeOptions;
  if (activeTab === "deliveryTiers") data = deliveryTiers;
  if (activeTab === "addOns") data = addOns;
  if (activeTab === "foldingOptions") data = foldingOptions;
  if (activeTab === "customisationOptions") data = customisationOptions;

  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = useMemo(() => {
    return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [data, currentPage, pageSize]);

  // HELPERS
  const handleStatusToggle = () =>
    alert("Status toggle will be connected later");

  const handleCancel = () => {
    setIsAddPopupOpen(false);
    setNewEntry("");
    setDescription("");
    setSelectedServices([]);
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setSelectedCategory("");
    setSelectedAttribute("");
    setSelectedItem("");
    setHoursSla("");
    setSurchargeType("pct");
    setDefaultSurcharge("");
    setSurchargePct("0");
  };

  // CONFIRM ADD
  const handleConfirmAdd = async () => {
    try {
      if (!newEntry.trim()) {
        alert("Enter name");
        return;
      }

      if (activeTab === "services") {
        await createService({
          name: newEntry,
          description: description,
        });
      }

      if (activeTab === "categories") {
        if (selectedServices.length === 0) {
          alert("Select at least one service");
          return;
        }
        await createCategory({
          name: newEntry,
          service_ids: selectedServices,
        });
      }

      if (activeTab === "subcategories") {
        if (!selectedCategory) {
          alert("Select category");
          return;
        }
        if (selectedServices.length === 0) {
          alert("Select at least one service");
          return;
        }
        await createSubcategory({
          name: newEntry,
          category: selectedCategory,
          service_ids: selectedServices,
        });
      }

      if (activeTab === "items") {
        if (selectedServices.length === 0) {
          alert("Select at least one service");
          return;
        }
        if (selectedCategories.length === 0) {
          alert("Select at least one category");
          return;
        }
        if (selectedSubcategories.length === 0) {
          alert("Select at least one subcategory");
          return;
        }

        await createItem({
          name: newEntry,
          description: description,
          service_ids: selectedServices,
          category_ids: selectedCategories,
          subcategory_ids: selectedSubcategories,
        });
      }

      if (activeTab === "attributes") {
        await createAttributeType({
          name: newEntry,
          display_label: newEntry,
          input_type: "select",
        });
      }

      if (activeTab === "attributeOptions") {
        if (!selectedAttribute) {
          alert("Select attribute");
          return;
        }
        await createAttributeOption({
          name: newEntry,
          attribute_type: selectedAttribute,
          surcharge_pct: parseFloat(surchargePct) || 0,
        });
      }

      if (activeTab === "deliveryTiers") {
        if (!hoursSla || !defaultSurcharge) {
          alert("Fill all delivery tier fields");
          return;
        }
        await createDeliveryTier({
          name: newEntry,
          hours_sla: parseInt(hoursSla),
          surcharge_type: surchargeType,
          default_surcharge: parseFloat(defaultSurcharge),
        });
      }

      if (activeTab === "addOns") {
        await createAddOn({
          name: newEntry,
          description: description,
        });
      }

      if (activeTab === "foldingOptions") {
        await createFoldingOption({
          name: newEntry,
          description: description,
        });
      }

      if (activeTab === "customisationOptions") {
        await createCustomisationOption({
          name: newEntry,
          description: description,
        });
      }

      handleCancel();
    } catch (error) {
      console.error(error);
      alert("Error creating entry");
    }
  };

  // COLUMNS
  const getColumns = () => {
    const baseColumns = [
      { key: "id", title: "ID", sortable: true },
      {
        key: "name",
        title: "Name",
        sortable: true,
        render: (value) => (
          <span className="font-medium text-gray-900">{value}</span>
        ),
      },
    ];

    if (activeTab === "categories") {
      baseColumns.push({
        key: "services",
        title: "Services",
        render: (value) => {
          if (!value || value.length === 0)
            return <span className="text-gray-400">None</span>;
          return (
            <div className="flex flex-wrap gap-1">
              {value.map((service) => (
                <span
                  key={service.id}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                >
                  {service.name}
                </span>
              ))}
            </div>
          );
        },
      });
    }

    if (activeTab === "subcategories") {
      baseColumns.push({
        key: "category_name",
        title: "Category",
        render: (value) => (
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
            {value}
          </span>
        ),
      });
      baseColumns.push({
        key: "services",
        title: "Services",
        render: (value) => {
          if (!value || value.length === 0)
            return <span className="text-gray-400">None</span>;
          return (
            <div className="flex flex-wrap gap-1">
              {value.map((service) => (
                <span
                  key={service.id}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                >
                  {service.name}
                </span>
              ))}
            </div>
          );
        },
      });
    }

    if (activeTab === "items") {
      baseColumns.push({
        key: "services",
        title: "Services",
        render: (value) => {
          if (!value || value.length === 0)
            return <span className="text-gray-400">None</span>;
          return (
            <div className="flex flex-wrap gap-1">
              {value.slice(0, 2).map((s) => (
                <span
                  key={s.id}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                >
                  {s.name}
                </span>
              ))}
              {value.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{value.length - 2} more
                </span>
              )}
            </div>
          );
        },
      });
      baseColumns.push({
        key: "categories",
        title: "Categories",
        render: (value) => {
          if (!value || value.length === 0)
            return <span className="text-gray-400">None</span>;
          return (
            <div className="flex flex-wrap gap-1">
              {value.slice(0, 2).map((c) => (
                <span
                  key={c.id}
                  className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs"
                >
                  {c.name}
                </span>
              ))}
              {value.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{value.length - 2} more
                </span>
              )}
            </div>
          );
        },
      });
      baseColumns.push({
        key: "subcategories",
        title: "Subcategories",
        render: (value) => {
          if (!value || value.length === 0)
            return <span className="text-gray-400">None</span>;
          return (
            <div className="flex flex-wrap gap-1">
              {value.slice(0, 2).map((sc) => (
                <span
                  key={sc.id}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                >
                  {sc.name}
                </span>
              ))}
              {value.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{value.length - 2} more
                </span>
              )}
            </div>
          );
        },
      });
    }

    if (activeTab === "attributeOptions") {
      baseColumns.push({
        key: "attribute_type_name",
        title: "Attribute",
        render: (value) => (
          <span className="px-2 py-1 text-gray-700 font-semibold rounded-md text-sm">
            {value || "N/A"}
          </span>
        ),
      });
      baseColumns.push({
        key: "surcharge_pct",
        title: "Surcharge",
        render: (value) => (
          <span
            className={`px-2 py-1 rounded text-xs ${value > 0 ? "bg-red-100 text-red-700" : "text-gray-400"}`}
          >
            {value > 0 ? `+${value}%` : "-"}
          </span>
        ),
      });
    }

    if (activeTab === "deliveryTiers") {
      baseColumns.push({
        key: "hours_sla",
        title: "SLA (hrs)",
        render: (value) => (
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
            {value}hrs
          </span>
        ),
      });
      baseColumns.push({
        key: "default_surcharge",
        title: "Surcharge",
        render: (value, record) => {
          const display =
            record.surcharge_type === "pct" ? `+${value}%` : `+AED ${value}`;
          return (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
              {display}
            </span>
          );
        },
      });
    }

    baseColumns.push({
      key: "is_active",
      title: "Status",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    });

    baseColumns.push({
      key: "action",
      title: "Action",
      render: (_, record) => (
        <button
          onClick={() => handleStatusToggle(record)}
          className={`px-3 py-1 rounded-md text-xs font-medium ${
            record.is_active
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {record.is_active ? "Deactivate" : "Activate"}
        </button>
      ),
    });

    return baseColumns;
  };

  const columns = getColumns();

  const tabLabel = {
    services: "Service",
    categories: "Category",
    subcategories: "Subcategory",
    items: "Item",
    attributes: "Attribute Type",
    attributeOptions: "Attribute Option",
    deliveryTiers: "Delivery Tier",
    addOns: "Add-On",
    foldingOptions: "Folding Option",
    customisationOptions: "Customisation Option",
  };

  const tabs = [
    { id: "services", label: "Services" },
    { id: "categories", label: "Categories" },
    { id: "subcategories", label: "Subcategories" },
    { id: "items", label: "Items" },
    { id: "attributes", label: "Attribute Types" },
    { id: "attributeOptions", label: "Attribute Options" },
    { id: "deliveryTiers", label: "Delivery Tiers" },
    { id: "addOns", label: "Add-Ons" },
    { id: "foldingOptions", label: "Folding Options" },
    { id: "customisationOptions", label: "Customisation Options" },
  ];

  return (
    <div className="w-[1200px] mx-auto my-10 font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Catalog Management</h1>
        <p className="text-base font-semibold text-gray-500 mt-1">
          Hierarchical Structure: Service → Category → Subcategory → Item
        </p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-200 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-3 font-medium text-sm transition-all relative ${
              activeTab === tab.id
                ? "text-gray-900 border-b-2 border-gray-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => {
              setActiveTab(tab.id);
              setCurrentPage(1);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-lg mb-6 flex justify-end">
        {!isAddPopupOpen && (
          <button
            onClick={() => setIsAddPopupOpen(true)}
            className="bg-gray-700 hover:bg-gray-800 px-6 py-2 text-white rounded-lg"
          >
            + Add {tabLabel[activeTab]}
          </button>
        )}
      </div>

      {isAddPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[500px] max-w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Add New {tabLabel[activeTab]}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {[
              "services",
              "items",
              "addOns",
              "foldingOptions",
              "customisationOptions",
            ].includes(activeTab) && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
            )}

            {activeTab === "categories" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Services <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {services.map((s) => (
                    <label key={s.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(s.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedServices([...selectedServices, s.id]);
                          } else {
                            setSelectedServices(
                              selectedServices.filter((id) => id !== s.id),
                            );
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{s.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "subcategories" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="">Choose category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Services <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {services.map((s) => (
                      <label key={s.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(s.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedServices([...selectedServices, s.id]);
                            } else {
                              setSelectedServices(
                                selectedServices.filter((id) => id !== s.id),
                              );
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{s.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "items" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Services <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                    {services.map((s) => (
                      <label key={s.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(s.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedServices([...selectedServices, s.id]);
                            } else {
                              setSelectedServices(
                                selectedServices.filter((id) => id !== s.id),
                              );
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{s.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Categories <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                    {categories.map((c) => (
                      <label key={c.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(c.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([
                                ...selectedCategories,
                                c.id,
                              ]);
                            } else {
                              setSelectedCategories(
                                selectedCategories.filter((id) => id !== c.id),
                              );
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{c.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Subcategories <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                    {subcategories.map((sc) => (
                      <label
                        key={sc.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubcategories.includes(sc.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSubcategories([
                                ...selectedSubcategories,
                                sc.id,
                              ]);
                            } else {
                              setSelectedSubcategories(
                                selectedSubcategories.filter(
                                  (id) => id !== sc.id,
                                ),
                              );
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">
                          {sc.name}{" "}
                          <span className="text-gray-400 text-xs">
                            ({sc.category_name})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "attributeOptions" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Attribute <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedAttribute}
                    onChange={(e) => setSelectedAttribute(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="">Choose an attribute</option>
                    {attributes.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.display_label || a.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surcharge % (e.g., Silk = +10%)
                  </label>
                  <input
                    type="number"
                    value={surchargePct}
                    onChange={(e) => setSurchargePct(e.target.value)}
                    placeholder="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </>
            )}

            {activeTab === "deliveryTiers" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hours SLA <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={hoursSla}
                    onChange={(e) => setHoursSla(e.target.value)}
                    placeholder="e.g., 2, 4, 24, 48"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surcharge Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={surchargeType}
                    onChange={(e) => setSurchargeType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="pct">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (AED)</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Surcharge <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={defaultSurcharge}
                    onChange={(e) => setDefaultSurcharge(e.target.value)}
                    placeholder={
                      surchargeType === "pct"
                        ? "e.g., 150 for +150%"
                        : "e.g., 50 for +50 AED"
                    }
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAdd}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <DataTable data={paginatedData} columns={columns} actionMenu={false} />
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}
