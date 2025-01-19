import React, { useState } from "react";
import Navbar from "./AdminNavbar.jsx";
import Sidebar from "./AdminSidebar.jsx";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visibleGroups, setVisibleGroups] = useState({}); // Track each group's visibility independently
  const reduxRoleId = useSelector((state) => state.auth.staff?.role_id);
  const role_id = reduxRoleId || localStorage.getItem("role_id");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  console.log(visibleGroups);
  
  const toggleGroupVisibility = (menuId) => {
    setVisibleGroups((prev) => ({
      ...prev,
      [menuId]: !prev[menuId], // Toggle the visibility for this specific menu
    }));
  };

    return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        role_id={role_id}
        visibleGroups={visibleGroups}
        toggleGroupVisibility={toggleGroupVisibility}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
