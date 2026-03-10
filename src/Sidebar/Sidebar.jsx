import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdShoppingBag,
  MdInventory,
  MdPeople,
  MdChevronLeft,
  MdChevronRight,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";
import logo from "../assets/Logo.png";
import { Settings,  UserCog } from "lucide-react";
import { FaTshirt } from "react-icons/fa";
const MENU = [
  { id: "dashboard", label: "Dashboard", icon: MdDashboard, path: "/dashboard" },
    { id: "Cloth data", label: "Cloth data", icon: FaTshirt, path: "/clothes-data" },
  { id: "Services", label: "Services", icon: MdShoppingBag, path: "/Services" },
  { id: "Items", label: "Items", icon: MdInventory, path: "/Items" },
  { id: "Attributes", label: "Attributes", icon: MdPeople, path: "/Attributes" },
    { id: "Vendor", label: "Vendor", icon: UserCog , path: "/Vendor" },
        { id: "Settings", label: "settings", icon: Settings , path: "/settings" },

];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b flex items-center px-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <MdMenu size={24} />
        </button>
        <span className="ml-3 font-semibold">Keelean Admin</span>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-80
          bg-white border-r border-gray-200 shadow-sm
          transition-transform duration-300 z-50 

          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 overflow-hidden">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>

            <h1 className="text-gray-900 font-bold text-base">
              Keelean Admin
            </h1>
          </div>

          {/* Close mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100 md:hidden"
          >
            <MdClose size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {MENU.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center w-full rounded-lg px-4 py-3 gap-3
                      ${
                        active
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-md
                      ${
                        active
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="bottom-0 border-t border-gray-200 px-3 py-4">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center w-full rounded-lg px-4 py-3 gap-3 hover:bg-gray-100"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-600">
              <MdLogout size={20} />
            </div>

            <span className="text-sm font-medium text-gray-700">
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}