import DataTable from "../DataTable/dataTable";
import Pagination from "../DataTable/DataPagination";
import React, { useState, useMemo } from "react";

export default function Clothesdata() {
  const [activeTab, setActiveTab] = useState("services");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [newEntry, setNewEntry] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
const [serviceImage, setServiceImage] = useState(null);
  const [catalog, setCatalog] = useState({
    services: [
  { id: 1, name: "Dry Cleaning", image: "https://i.pinimg.com/736x/4d/83/61/4d8361d319543e2bf127382ddf3a4005.jpg", status: true },
  { id: 2, name: "Wash & Fold", image: "https://i.pinimg.com/736x/f7/7f/30/f77f3050db14a5d7effe7c049b08f05e.jpg", status: true },
  { id: 3, name: "Ironing", image: "https://i.pinimg.com/736x/1d/ec/c3/1decc3508579b6d5778c14217987473f.jpg", status: false }
],
    items: [
      { id: 1, name: "Abaya", serviceId: 1, status: true },
      { id: 2, name: "Shirt", serviceId: 2, status: true },
      { id: 3, name: "Suit", serviceId: 1, status: false }
    ],
   attributes: [
  { id: 1, name: "Fabric", itemId: 1, status: true },
  { id: 2, name: "Gender", itemId: 2, status: true },
  { id: 3, name: "Weight Range", itemId: 1, status: false }
    ],
    attributeOptions: [
      { id: 1, name: "Silk", attributeId: 1, status: true },
      { id: 2, name: "Cotton", attributeId: 1, status: true },
      { id: 3, name: "Men", attributeId: 2, status: true },
      { id: 4, name: "Women", attributeId: 2, status: false }
    ]
  });

const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setServiceImage(imageUrl);
  }
};  const data = catalog[activeTab] || [];

  // Calculate pagination
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  const paginatedData = useMemo(() => {
    return data.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [data, currentPage, pageSize]);

  // Handle status toggle
  const handleStatusToggle = (record) => {
    const newStatus = !record.status;
    
    setCatalog(prevCatalog => ({
      ...prevCatalog,
      [activeTab]: prevCatalog[activeTab].map(item =>
        item.id === record.id ? { ...item, status: newStatus } : item
      )
    }));
  };

  // Handle add new entry
  const handleAddClick = () => {
    if (!newEntry.trim()) {
      alert("Please enter a name");
      return;
    }
    setIsAddPopupOpen(true);
  };

  const handleConfirmAdd = () => {
    const currentData = catalog[activeTab];
    const newId = currentData.length > 0 
      ? Math.max(...currentData.map(item => item.id)) + 1 
      : 1;

    let newItem;

    switch(activeTab) {
      case "services":

  newItem = {
    id: newId,
    name: newEntry,
    image: serviceImage,
    status: true
  };

  break;
      case "items":
        if (!selectedService) {
          alert("Please select a service");
          return;
        }
        newItem = { 
          id: newId, 
          name: newEntry, 
          serviceId: parseInt(selectedService), 
          status: true 
        };
        break;
    case "attributes":

  if (!selectedService) {
    alert("Please select an item type");
    return;
  }

  newItem = {
    id: newId,
    name: newEntry,
    itemId: parseInt(selectedService),
    status: true
  };

  break;
      case "attributeOptions":
        if (!selectedAttribute) {
          alert("Please select an attribute");
          return;
        }
        newItem = { 
          id: newId, 
          name: newEntry, 
          attributeId: parseInt(selectedAttribute), 
          status: true 
        };
        break;
      default:
        return;
    }

    setCatalog(prevCatalog => ({
      ...prevCatalog,
      [activeTab]: [...prevCatalog[activeTab], newItem]
    }));

    // Reset form
    setIsAddPopupOpen(false);
    setNewEntry("");
    setSelectedAttribute("");
    setSelectedService("");
  };

  const handleCancel = () => {
    setIsAddPopupOpen(false);
    setNewEntry("");
    setSelectedAttribute("");
    setSelectedService("");
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
      key: "serviceId",
      title: "Service",
      render: (value) => {
        const service = catalog.services.find(s => s.id === value);
        return(
           <span className="px-2 py-1 text-gray-700 font-semibold  rounded-md text-sm">
            {service ? service.name : "N/A"}
          </span>
        );   
      }
    });
  }

  if (activeTab === "attributes") {
    baseColumns.push({
      key: "itemId",
      title: "Item Type",
      render: (value) => {
        const item = catalog.items.find(i => i.id === value);
        return (
          <span className="px-2 py-1 text-gray-700 font-semibold  rounded-md text-sm">
            {item ? item.name : "N/A"}
          </span>
        );
      }
    });
  }

  if (activeTab === "attributeOptions") {
    baseColumns.push({
      key: "attributeId",
      title: "Attribute",
      render: (value) => {
        const attribute = catalog.attributes.find(a => a.id === value);
        return (
          <span className="px-2 py-1 text-gray-700 font-semibold rounded-md text-sm">
            {attribute ? attribute.name : "N/A"}
          </span>
        );
      }
    });
  }

  baseColumns.push({
    key: "status",
    title: "Status",
    render: (value) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          value
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600"
        }`}
      >
        {value ? "Active" : "Inactive"}
      </span>
    )
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
    )
  });

  return baseColumns;
};

  const columns = getColumns();

  const tabs = [
    { id: "services", label: "Service Categories" },
    { id: "items", label: "Item Types"},
    { id: "attributes", label: "Attribute Types"},
    { id: "attributeOptions", label: "Attribute Options" }
  ];

  return (
    <div className="w-[1100px] mx-auto my-10 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Catalog Management</h1>
        <p className="text-base font-semibold text-gray-500 mt-1">Manage your services, items, attributes and options</p>
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
  + Add {activeTab === "services"
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
  {activeTab === "items" && (
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select Service</option>
          {catalog.services.map(service => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      )}
{activeTab === "attributes" && (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Select Item Type
    </label>

    <select
      value={selectedService}
      onChange={(e) => setSelectedService(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    >
      <option value="">Choose Item Type</option>

      {catalog.items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
)}

      {activeTab === "attributeOptions" && (
        <select
          value={selectedAttribute}
          onChange={(e) => setSelectedAttribute(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select Attribute</option>
          {catalog.attributes.map(attr => (
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
              Add New {activeTab === "services" ? "Service" : 
                       activeTab === "items" ? "Item" : 
                       activeTab === "attributes" ? "Attribute" : 
                       "Attribute Option"}
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
                  {catalog.services.map(service => (
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
                  {catalog.attributes.map(attr => (
                    <option key={attr.id} value={attr.id}>
                      {attr.name}
                    </option>
                  ))}
                </select>
              </div>
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

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <DataTable
          data={paginatedData}
          columns={columns}
          actionMenu={false}
        />
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