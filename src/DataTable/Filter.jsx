import React, { useState } from "react";
import { Search, Filter, X, Calendar } from "lucide-react";

const Filters = ({
  searchPlaceholder = "Search...",
  onSearch,
  onDateChange,
  onStatusFilter,
  statusOptions = [],
  onReset,
  extraFilters = null,
  showDateFilter = true,     
  showStatusFilter = true,   
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [createdDate, setCreatedDate] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    onStatusFilter?.(status);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setCreatedDate(value);
    onDateChange?.(value || undefined);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedStatus("all");
    setCreatedDate("");
    onReset?.();
  };
  return (
    <div className="bg-white rounded-lg p-4 mb-6 border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearch}
              className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64
                         focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          {showStatusFilter && statusOptions.length > 0 && (
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="pl-9 pr-4 py-2 border rounded-lg bg-white
                           focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="all">All</option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          {showDateFilter && (
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={createdDate}
                onChange={handleDateChange}
                className="pl-9 pr-4 py-2 border rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          )}

          {extraFilters}
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 border rounded-lg flex items-center gap-2
                     hover:bg-gray-50 text-gray-700"
        >
          <X className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;
