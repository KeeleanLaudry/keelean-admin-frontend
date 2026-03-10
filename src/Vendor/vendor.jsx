import React, { useState, useMemo } from "react";
import DataTable from "../DataTable/dataTable";
import Pagination from "../DataTable/DataPagination";
import ViewModal from "../Model/view";
import EditModal from "../Model/EditModal";
import DeleteModal from "../Model/delete";
import Filters from "../DataTable/Filter";
const staticVendors = [
  {
    id: 1,
    profile: "https://i.pravatar.cc/40?img=1",
    businessName: "Clean Express",
    subscription: "Pending",
    email: "cleanexpress@gmail.com",
    stripe: "Completed",
    status: "Approved",
    active: true,
  },
  {
    id: 2,
    profile: "https://i.pravatar.cc/40?img=2",
    businessName: "Laundry Hub",
    subscription: "Completed",
    email: "laundryhub@gmail.com",
    stripe: "Pending",
    status: "Pending",
    active: false,
  },
  {
    id: 3,
    profile: "https://i.pravatar.cc/40?img=3",
    businessName: "Quick Wash",
    subscription: "Pending",
    email: "quickwash@gmail.com",
    stripe: "Completed",
    status: "Approved",
    active: true,
  },
  {
    id: 4,
    profile: "https://i.pravatar.cc/40?img=4",
    businessName: "Laundry Point",
    subscription: "Completed",
    email: "laundrypoint@gmail.com",
    stripe: "Completed",
    status: "Approved",
    active: true,
  },
  {
    id: 5,
    profile: "https://i.pravatar.cc/40?img=5",
    businessName: "Fresh Laundry",
    subscription: "Pending",
    email: "fresh@gmail.com",
    stripe: "Pending",
    status: "Pending",
    active: false,
  },
];

export default function VendorPage() {
  const [vendors, setVendors] = useState(staticVendors);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("all");
const [subscriptionFilter, setSubscriptionFilter] = useState("all");
  const handleView = (item) => setViewItem(item);
  const handleEdit = (row) => setEditItem(row);
  const handleDelete = (item) => setDeleteItem(item);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

const filteredVendors = useMemo(() => {
  return vendors.filter((vendor) => {

    const matchesSearch =
      vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || vendor.status === statusFilter;

    const matchesSubscription =
      subscriptionFilter === "all" ||
      vendor.subscription === subscriptionFilter;

    return matchesSearch && matchesStatus && matchesSubscription;

  });
}, [vendors, searchTerm, statusFilter, subscriptionFilter]);

  const sortedVendors = useMemo(() => {
    let sortable = [...filteredVendors];

    if (sortConfig.key) {
      sortable.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    return sortable;
  }, [filteredVendors, sortConfig]);

  const totalItems = sortedVendors.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = sortedVendors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "Profile",
      key: "profile",
      render: (value) => (
        <img 
          src={value} 
          className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover" 
          alt="Profile"
        />
      ),
    },
    {
      title: "Business Name",
      key: "businessName",
      render: (value) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      title: "Subscription",
      key: "subscription",
      render: (value) => (
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          value === "Completed" 
              ? "bg-yellow-100 text-yellow-700" 
            : "bg-green-100 text-green-800"
        }`}>
          {value}
        </span>
      ),
    },
    {
      title: "Email",
      key: "email",
      render: (value) => (
        <span className="text-gray-600 font-semibold">{value}</span>
      ),
    },
    {
      title: "Stripe Onboarding",
      key: "stripe",
      render: (value) => (
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            value === "Completed"
             ? "bg-yellow-100 text-yellow-700" 
            : "bg-green-100 text-green-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (value) => (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          value === "Approved"
              ? "bg-yellow-100 text-yellow-700" 
            : "bg-green-100 text-green-800"
        }`}>
          {value}
        </span>
      ),
    },
    {
      title: "Active",
      key: "active",
      render: (value) => (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
          value 
            ? "bg-yellow-100 text-yellow-700" 
            : "bg-green-100 text-green-800"
        }`}>
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const confirmDelete = () => {
    setVendors((prev) =>
      prev.filter((v) => v.id !== deleteItem.id)
    );
    setDeleteItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Vendors
          </h1>
          <p className="text-gray-600">
            View and manage all vendors in your system
          </p>
        </div>

  <Filters
  searchPlaceholder="Search vendors..."
  showDateFilter={false}
    onSearch={(value) => {
    
    setSearchTerm(value);
    setCurrentPage(1);
  }}
  onStatusFilter={(status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  }}
  onReset={() => {
    setSearchTerm("");
    setStatusFilter("all");
    setSubscriptionFilter("all");
    setCurrentPage(1);
  }}
  statusOptions={[
    { value: "Approved", label: "Approved" },
    { value: "Pending", label: "Pending" },
  ]}
  extraFilters={
    <select
      value={subscriptionFilter}
      onChange={(e) => {
        setSubscriptionFilter(e.target.value);
        setCurrentPage(1);
      }}
      className="px-3 py-2 border rounded-lg bg-white
                 focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      <option value="all">All Subscription</option>
      <option value="Completed">Completed</option>
      <option value="Pending">Pending</option>
    </select>
  }
/>
        {/* Table Section */}
        <div className=" rounded-xl  overflow-hidden">
          <DataTable
            data={paginatedData}
            columns={columns}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          
          {/* Pagination */}
          <div className="  px-6 py-4">
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

        {/* Modals */}
        {viewItem && (
          <ViewModal
            item={viewItem}
            title="Vendor Details"
            fields={[
              { key: "profile", type: "Profile" },
              { key: "businessName", label: "Business Name" },
              { key: "subscription", label: "Subscription" },
              { key: "email", label: "Email" },
              { key: "stripe", label: "Stripe Onboarding" },
              { key: "status", label: "Status" },
              { key: "active", label: "Active" },
            ]}
            onClose={() => setViewItem(null)}
          />
        )}

        {editItem && (
          <EditModal
            item={editItem}
            title="Edit Vendor Details"
            fields={[
              { key: "profile", type: "Profile" },
              { key: "businessName", label: "Business Name" },
              { key: "subscription", label: "Subscription" },
              { key: "email", label: "Email" },
              { key: "stripe", label: "Stripe Onboarding" },
              { key: "status", label: "Status" },
              { key: "active", label: "Active" },
            ]}
            onClose={() => setEditItem(null)}
            onSave={(updated) => {
              setVendors((prev) =>
                prev.map((v) =>
                  v.id === updated.id ? updated : v
                )
              );
              setEditItem(null);
            }}
          />
        )}

        {deleteItem && (
          <DeleteModal
            item={deleteItem}
            title="Delete Vendor"
            message={`Are you sure you want to delete "${deleteItem.businessName}"? This action cannot be undone.`}
            onConfirm={confirmDelete}
            onClose={() => setDeleteItem(null)}
          />
        )}
      </div>
    </div>
  );
}