import React, { useState, useRef } from "react";
import DataTable from "../DataTable/dataTable";
import ViewModal from "../Model/view";
import EditModal from "../Model/EditModal";
import DeleteModal from "../Model/delete";
import ServiceForm from "./ServiceForm";
import Pagination from "../DataTable/DataPagination";
import { title } from "framer-motion/client";
import AddModal from "../Model/add";

const initialServices = [
  {
    id: 1,
    service_name: "Wash & Fold",
    service_code: "WF",
    slug: "wash-fold",
    short_description: "Regular washing and folding",
    long_description: "Machine wash, tumble dry, neatly folded clothes",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop",
    badge: "Popular",
    service_type: "Laundry",
    turnaround_days: 1,
    base_price: 79,
    status: 1,
  },
  {
    id: 2,
    service_name: "Dry Cleaning",
    service_code: "DC",
    slug: "dry-cleaning",
    short_description: "Premium dry cleaning",
    long_description: "Professional solvent-based cleaning for delicate fabrics",
    image: "https://i.pinimg.com/736x/5b/98/ff/5b98ff7565e300148c0aac8a760710b2.jpg",
    badge: "Premium",
    service_type: "DryClean",
    turnaround_days: 3,
    base_price: 199,
    status: 1,
  },
  {
    id: 3,
    service_name: "Steam Iron",
    service_code: "SI",
    slug: "steam-iron",
    short_description: "Steam ironing service",
    long_description: "High-temperature steam ironing for wrinkle removal",
    image: "https://i.pinimg.com/1200x/b5/43/42/b54342e69f2e0791f47e48a73a3ea197.jpg",
    badge: "",
    service_type: "Laundry",
    turnaround_days: 1,
    base_price: 49,
    status: 1,
  },
  {
    id: 4,
    service_name: "Shoe Cleaning",
    service_code: "SC",
    slug: "shoe-cleaning",
    short_description: "Shoe wash & polish",
    long_description: "Deep cleaning and polishing for all shoe types",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop",
    badge: "New",
    service_type: "SpecialCare",
    turnaround_days: 2,
    base_price: 249,
    status: 1,
  },
  {
    id: 5,
    service_name: "Carpet Wash",
    service_code: "CW",
    slug: "carpet-wash",
    short_description: "Deep carpet cleaning",
    long_description: "Shampoo and vacuum extraction carpet wash",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=300&fit=crop",
    badge: "",
    service_type: "SpecialCare",
    turnaround_days: 3,
    base_price: 399,
    status: 1,
  },
  {
    id: 6,
    service_name: "Blanket Wash",
    service_code: "BW",
    slug: "blanket-wash",
    short_description: "Heavy blanket wash",
    long_description: "Machine wash and hygienic drying of blankets",
    image: "https://i.pinimg.com/736x/e2/86/3e/e2863e81ee78b800e761e46de7feba8b.jpg",
    badge: "Popular",
    service_type: "Laundry",
    turnaround_days: 2,
    base_price: 299,
    status: 1,
  },
  {
    id: 7,
    service_name: "Curtain Cleaning",
    service_code: "CC",
    slug: "curtain-cleaning",
    short_description: "Curtain wash",
    long_description: "Gentle wash and steam finish for curtains",
    image: "https://i.pinimg.com/1200x/60/28/e8/6028e853efb975db607616df23f7c2a2.jpg",
    badge: "",
    service_type: "SpecialCare",
    turnaround_days: 3,
    base_price: 349,
    status: 1,
  },
  {
    id: 8,
    service_name: "Saree Care",
    service_code: "SR",
    slug: "saree-care",
    short_description: "Special saree wash",
    long_description: "Delicate hand-wash for silk and designer sarees",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
    badge: "Premium",
    service_type: "DryClean",
    turnaround_days: 3,
    base_price: 299,
    status: 1,
  },
  {
    id: 9,
    service_name: "Leather Cleaning",
    service_code: "LC",
    slug: "leather-cleaning",
    short_description: "Leather garment care",
    long_description: "Special chemical cleaning for leather items",
    image: "https://i.pinimg.com/1200x/67/a0/83/67a083081d2c7a2c871ae8cef1e17f53.jpg",
    badge: "Premium",
    service_type: "SpecialCare",
    turnaround_days: 4,
    base_price: 499,
    status: 1,
  },
  {
    id: 10,
    service_name: "Stain Removal",
    service_code: "SRM",
    slug: "stain-removal",
    short_description: "Advanced stain treatment",
    long_description: "Targeted stain removal process",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
    badge: "",
    service_type: "DryClean",
    turnaround_days: 2,
    base_price: 149,
    status: 1,
  },
  {
    id: 11,
    service_name: "Winter Wear Cleaning",
    service_code: "WW",
    slug: "winter-wear-cleaning",
    short_description: "Jacket & coat cleaning",
    long_description: "Special care cleaning for winter garments",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=300&fit=crop",
    badge: "",
    service_type: "DryClean",
    turnaround_days: 3,
    base_price: 399,
    status: 1,
  },
  {
    id: 12,
    service_name: "Wedding Dress Cleaning",
    service_code: "WD",
    slug: "wedding-dress-cleaning",
    short_description: "Bridal dress care",
    long_description: "Luxury cleaning for wedding dresses",
    image: "https://www.zapdress.com/cdn/shop/files/long-a-line-sweetheart-applqiues-lace-tulle-wedding-dress.jpg?v=1768673402&width=720",
    badge: "Premium",
    service_type: "DryClean",
    turnaround_days: 5,
    base_price: 999,
    status: 1,
  },
  {
    id: 13,
    service_name: "Soft Toy Cleaning",
    service_code: "ST",
    slug: "soft-toy-cleaning",
    short_description: "Toy sanitization",
    long_description: "Gentle wash and sanitization for soft toys",
    image: "https://i.pinimg.com/736x/e0/bc/f2/e0bcf2d9caceee51c740a1be37852cba.jpg",
    badge: "New",
    service_type: "SpecialCare",
    turnaround_days: 2,
    base_price: 199,
    status: 1,
  },
  {
    id: 14,
    service_name: "Mattress Cleaning",
    service_code: "MC",
    slug: "mattress-cleaning",
    short_description: "Deep mattress cleaning",
    long_description: "Steam and vacuum mattress sanitization",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
    badge: "",
    service_type: "SpecialCare",
    turnaround_days: 3,
    base_price: 799,
    status: 1,
  },
  {
    id: 15,
    service_name: "Pillow Cleaning",
    service_code: "PC",
    slug: "pillow-cleaning",
    short_description: "Pillow wash",
    long_description: "Machine wash and drying of pillows",
    image: "https://i.pinimg.com/736x/bf/09/f1/bf09f1d6ba76b397bb169e8cb8e6f2e3.jpg",
    badge: "",
    service_type: "Laundry",
    turnaround_days: 1,
    base_price: 99,
    status: 1,
  },
];

const ManageServices = () => {
  const [services, setServices] = useState(initialServices);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const formRef = useRef();

  // Filter and search logic
  const filteredServices = services.filter(service => {
    const matchesSearch = service.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.service_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.short_description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || service.service_type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  // Sorting logic
  const sortedServices = React.useMemo(() => {
    let sortableServices = [...filteredServices];
    if (sortConfig.key !== null) {
      sortableServices.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableServices;
  }, [filteredServices, sortConfig]);

  const totalItems = sortedServices.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedData = sortedServices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Get unique service types for filter
  const serviceTypes = ['all', ...new Set(services.map(s => s.service_type))];

  const handleView = (item) => setViewItem(item);
  const handleEdit = (row) => setEditItem(row);
  const handleDelete = (item) => setDeleteItem(item);

const handleSave = () => {
  const updated = formRef.current?.getData();
  
  if (!updated?.id) {
    console.error("Missing id in updated service");
    return;
  }

  setServices(prev =>
    prev.map(s => (s.id === updated.id ? updated : s))
  );
  setEditItem(null);
};

  const confirmDelete = async () => {
    setServices((prev) => prev.filter((s) => s.id !== deleteItem.id));
    setDeleteItem(null);
  };

 const handleAdd = (data) => {
  const newService = {
    ...data,
    id: Date.now(),
  };

  setServices(prev => [...prev, newService]);
  setAddOpen(false);
};

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const columns = [
    {key :"id", title :"Id"},
    {
      key: "image",
      title: "image",
      render: (value, row) => (
        <div className="relative group">
          <img
            src={value}
            alt={row.service_name}
            className="w-16 h-12 object-cover rounded-lg shadow-md group-hover:scale-110 transition-transform duration-200"
          />
        
        </div>
      ),
    },
    {
      key: "service_name",
      title: "Service Name",
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-xs text-gray-500">{row.service_code}</div>
        </div>
      ),
    },
    {
      key: "short_description",
      title: "Description",
        render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
        </div>
      ),
     
    },
    {
      key: "base_price",
      title: "Price",
      render: (value) => (
        <span className="font-semibold text-gray-900">AED {value}</span>
      ),
    },
   
{
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
  ),
}
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header with Gradient */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
              <p className="text-gray-600 mt-1 text-lg">Manage your laundry services and pricing</p>
            </div>
           
          </div>
        </div>

      
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search services by name, code or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              {serviceTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          data={paginatedData}
          columns={columns}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSort={requestSort}
          sortConfig={sortConfig}
        />

        {/* Pagination */}
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


{addOpen && (
  <AddModal
    title="Add Service"
    FormComponent={ServiceForm}
    formRef={formRef}
    onSave={(data) => {
      const newService = {
        ...data,
        id: Date.now(),
        status: data.status ?? 1
      };
      setServices(prev => [...prev, newService]);
      setAddOpen(false);
    }}
    onClose={() => setAddOpen(false)}
  />
)}
        {viewItem && (
          <ViewModal
            item={viewItem}
            title="Service Details"
            fields={[
                    { key: "image", type: "image" },
              { key: "service_name", label: "Service Name" },
              { key: "service_code", label: "Code" },
              { key: "short_description", label: "Short Description" },
              { key: "long_description", label: "Long Description" },
              { key: "service_type", label: "Service Type" },
              { key: "base_price", label: "Price", type: "number" },
              { key: "turnaround_days", label: "Turnaround Days" },
              { key: "badge", label: "Badge" },
              { key: "status", label: "Status", type: "boolean" },
            ]}
            onClose={() => setViewItem(null)}
          />
        )}

{editItem && (
  <EditModal
    item={editItem}
    title="Edit Cloth Service"
    fields={[
      { key: "image", type: "image" },
      { key: "service_name", label: "Service Name" },
      { key: "service_code", label: "Code" },
      { key: "short_description", label: "Short Description" },
      { key: "long_description", label: "Long Description" },
      { key: "service_type", label: "Service Type" },
      { key: "base_price", label: "Price", type: "number" },
      { key: "turnaround_days", label: "Turnaround Days", type: "number" },
      { key: "badge", label: "Badge" },
      { key: "status", label: "Status", type: "boolean" },
    ]}
    onClose={() => setEditItem(null)}
    onSave={(updated) => {
      setServices((prev) =>
        prev.map((s) =>
          s.id === updated.id ? updated : s
        )
      );
      setEditItem(null);
    }}
  />
)}
        {deleteItem && (
          <DeleteModal
            item={deleteItem}
            title="Delete Service"
            message={`Are you sure you want to delete "${deleteItem.service_name}"? This action cannot be undone.`}
            onConfirm={confirmDelete}
            onClose={() => setDeleteItem(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ManageServices;