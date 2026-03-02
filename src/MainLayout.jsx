import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

export default function MainLayout() {
  return (
    <div className="bg-gray-50">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Page area */}
      <div className="md:ml-80">
     <main
  id="main-content"
  className="p-6 mt-14 md:mt-0 min-h-screen"
>
  <Outlet />
</main>
      </div>

    </div>
  );
}