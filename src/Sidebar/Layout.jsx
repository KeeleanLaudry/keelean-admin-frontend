import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3,
  Settings,
  Menu,
  X
} from 'lucide-react';
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Services", icon: ShoppingBag, href: "/services" },
  { name: "Items", icon: Package, href: "/items" },
  { name: "Attributes", icon: SlidersHorizontal, href: "/attributes" },
  { name: "Settings", icon: Settings, href: "/settings" },
];
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-lg shadow">
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => `
                      flex items-center space-x-3 px-4 py-3 rounded-lg
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">A</span>
              </div>
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-sm text-gray-500">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:ml-64">
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
export default Layout;