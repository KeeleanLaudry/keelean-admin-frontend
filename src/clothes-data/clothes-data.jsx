import DataTable from "../DataTable/dataTable";
import Pagination from "../DataTable/DataPagination";
import React, { useState, useMemo } from "react";
import {
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useGetItemsQuery,
  useCreateItemMutation,
  useGetAttributeTypesQuery,
  useCreateAttributeTypeMutation,
  useGetAttributeOptionsQuery,
  useCreateAttributeOptionMutation,
} from "../Api/catalogApi";
export default function Clothesdata() {
  const [activeTab, setActiveTab] = useState("services");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [newEntry, setNewEntry] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [serviceImage, setServiceImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
 
  const { data: services = [] } = useGetServicesQuery();
  const { data: items = [] } = useGetItemsQuery();
  const { data: attributes = [] } = useGetAttributeTypesQuery();
  const { data: attributeOptions = [] } = useGetAttributeOptionsQuery();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setServiceImage(imageUrl);
    }
  };
  // const data = catalog[activeTab] || [];
  let data = [];

  if (activeTab === "services") data = services;
  if (activeTab === "items") data = items;
  if (activeTab === "attributes") data = attributes;
  if (activeTab === "attributeOptions") data = attributeOptions;
  // Calculate pagination
  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const [createService] = useCreateServiceMutation();
  const [createItem] = useCreateItemMutation();
  const [createAttributeType] = useCreateAttributeTypeMutation();
  const [createAttributeOption] = useCreateAttributeOptionMutation();
  const paginatedData = useMemo(() => {
    return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [data, currentPage, pageSize]);

  // Handle status toggle
  const handleStatusToggle = () => {
    alert("Status toggle will be connected later");
  };

  // Handle add new entry
  const handleAddClick = () => {
    if (!newEntry.trim()) {
      alert("Please enter a name");
      return;
    }
    setIsAddPopupOpen(true);
  };

  const handleConfirmAdd = async () => {
    try {
      if (!newEntry.trim()) {
        alert("Enter name");
        return;
      }

      if (activeTab === "services") {
        await createService({
          name: newEntry,
        });
      }

    if (activeTab === "items") {
  if (!newEntry.trim()) {
    alert("Enter name");
    return;
  }

  await createItem({
    name: newEntry,
    services: [selectedService],
  });
}
      if (activeTab === "attributes") {
  if (!selectedItem) {
    alert("Select item type");
    return;
  }

  await createAttributeType({
    name: newEntry,
    applicable_items: [selectedItem],
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
        });
      }

      setIsAddPopupOpen(false);
      setNewEntry("");
      setSelectedAttribute("");
      setSelectedService("");
      setSelectedItem("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleCancel = () => {
    setIsAddPopupOpen(false);
    setNewEntry("");
    setSelectedAttribute("");
    setSelectedService("");
    setSelectedItem("");
  };

  const getColumns = () => {
    const baseColumns = [
      {
        key: "id",
        title: "ID",
        sortable: true,
      },
      {
        key: "name",
        title: "Name",
        sortable: true,
        render: (value) => (
          <span className="font-medium text-gray-900">{value}</span>
        ),
      },
    ];

    if (activeTab === "services") {
      baseColumns.push({
        key: "image",
        title: "Image",
        render: (value) =>
          value ? (
            <img
              src={value}
              alt="service"
              className="w-10 h-10 object-cover rounded-md"
            />
          ) : (
            <span className="text-gray-400 text-xs">No Image</span>
          ),
      });
    }

    if (activeTab === "items") {
      baseColumns.push({
        key: "services",
        title: "Service",
        render: (value) => {
          const service = services.find((s) => s.id === value?.[0]);
          return (
            <span className="px-2 py-1 text-gray-700 font-semibold rounded-md text-sm">
              {service ? service.name : "N/A"}
            </span>
          );
        },
      });
    }

 if (activeTab === "attributes") {
  baseColumns.push({
    key: "applicable_items",
    title: "Item Type",
    render: (value) => {
      const item = items.find((i) => i.id === value?.[0]);
      return (
        <span className="px-2 py-1 text-gray-700 font-semibold rounded-md text-sm">
          {item ? item.name : "N/A"}
        </span>
      );
    },
  });
}
    if (activeTab === "attributeOptions") {
      baseColumns.push({
        key: "attribute_type",
        title: "Attribute",
        render: (value) => {
          const attribute = attributes.find((a) => a.id === value);
          return (
            <span className="px-2 py-1 text-gray-700 font-semibold rounded-md text-sm">
              {attribute ? attribute.name : "N/A"}
            </span>
          );
        },
      });
    }

    baseColumns.push({
      key: "status",
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
            record.status
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {record.status ? "Deactivate" : "Activate"}
        </button>
      ),
    });

    return baseColumns;
  };

  const columns = getColumns();

  const tabs = [
    { id: "services", label: "Service Categories" },
    { id: "items", label: "Item Types" },
    { id: "attributes", label: "Attribute Types" },
    { id: "attributeOptions", label: "Attribute Options" },
  ];

  return (
    <div className="w-[1100px] mx-auto my-10 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Catalog Management</h1>
        <p className="text-base font-semibold text-gray-500 mt-1">
          Manage your services, items, attributes and options
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-3 font-medium text-sm transition-all relative ${
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
      <div className="p-4 rounded-lg  mb-6 flex justify-end">
        {!isAddPopupOpen && (
          <button
            onClick={() => setIsAddPopupOpen(true)}
            className="bg-gray-700 hover:bg-gray-800 px-6 py-2 text-white rounded-lg"
          >
            + Add{" "}
            {activeTab === "services"
              ? "Service"
              : activeTab === "items"
                ? "Item"
                : activeTab === "attributes"
                  ? "Attribute"
                  : "Attribute Option"}
          </button>
        )}

        {isAddPopupOpen && (
          <div className="flex gap-3 items-center">
            {activeTab === "services" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            )}
            {/* {activeTab === "items" && (
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            )} */}
     {activeTab === "attributes" && (
  <select
    value={selectedItem}
    onChange={(e) => setSelectedItem(e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded-lg"
  >
    <option value="">Select Item</option>
    {items.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ))}
  </select>
)}
            {activeTab === "attributeOptions" && (
              <select
                value={selectedAttribute}
                onChange={(e) => setSelectedAttribute(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Attribute</option>
                {attributes.map((attr) => (
                  <option key={attr.id} value={attr.id}>
                    {attr.name}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={handleCancel}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Add Popup Modal */}
      {isAddPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Add New{" "}
              {activeTab === "services"
                ? "Service"
                : activeTab === "items"
                  ? "Item"
                  : activeTab === "attributes"
                    ? "Attribute"
                    : "Attribute Option"}
            </h3>

            {activeTab === "items" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Service <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="">Choose a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {activeTab === "services" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Service Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />

                {serviceImage && (
                  <img
                    src={serviceImage}
                    alt="preview"
                    className="mt-3 w-20 h-20 object-cover rounded-md border"
                  />
                )}
              </div>
            )}
            {activeTab === "attributes" && (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Select Item Type <span className="text-red-500">*</span>
    </label>

    <select
      value={selectedItem}
      onChange={(e) => setSelectedItem(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      <option value="">Choose Item Type</option>
      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
)}
 {activeTab === "attributeOptions" && (
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
                  {attributes.map((attr) => (
                    <option key={attr.id} value={attr.id}>
                      {attr.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
           


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

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <DataTable data={paginatedData} columns={columns} actionMenu={false} />
      </div>

      {/* Pagination */}
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
