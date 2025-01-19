import React, { useState } from "react";
import StudentSidebar from "./studentsidebar";
import StudentNavbar from "./studentnavbar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar visibility
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  // Toggle sidebar visibility
  const toggleStudentSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <StudentSidebar isOpen={isSidebarOpen} toggleStudentSidebar={toggleStudentSidebar} />

      {/* Main Content */}
      <div
        className={`flex flex-col ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } transition-all duration-300`}
      >
        {/* Navbar */}
        <StudentNavbar
          toggleStudentSidebar={toggleStudentSidebar}
          isStudentSidebarOpen={isSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
