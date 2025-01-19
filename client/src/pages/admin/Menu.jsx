import React, { useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa"; // Importing the edit and cross mark icons

const Lesson = () => {
  const [menuView, setMenuView] = useState("mainMenu"); // To toggle the right-side menu list
  const [leftView, setLeftView] = useState("default"); // To toggle the left-side form

  // Menu items for the submenu
  const menuItems = ["Home", "Online Admission", "Complain", "Contact Us"];

  // State for the form data
  const [formData, setFormData] = useState({
    menuItem: "",
    externalUrl: false,
    openInNewTab: false,
    externalUrlAddress: "",
    selectedPage: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggle = (field) => {
    setFormData({
      ...formData,
      [field]: !formData[field],
    });
  };

  return (
    <div className="flex gap-6 p-4">
      {/* Left Side: Dynamic View */}
      <div className="bg-gray-100 p-6 rounded shadow-lg w-full md:w-2/3">
        {leftView === "default" ? (
          <>
            <h3 className="text-xl font-semibold mb-4 text-black">Add Menu</h3>
            <textarea
              placeholder="Enter menu description"
              className="w-full p-2 border border-gray-400 rounded bg-gray-200 text-black"
            ></textarea>
            <textarea
              placeholder="Enter description"
              className="w-full p-2 border border-gray-400 rounded bg-gray-200 text-black mt-4"
            ></textarea>
            <button className="w-[120px] bg-gray-800 text-white font-bold py-1 rounded mx-auto ml-40 mt-6">
              Save
            </button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-4 text-black">Add Menu Item</h3>
            {/* Menu Item */}
            <div className="mb-4">
              <label className="block font-medium mb-1 text-black">Menu Item *</label>
              <input
                type="text"
                name="menuItem"
                value={formData.menuItem}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-400 rounded bg-gray-200 text-black"
                placeholder="Enter menu item"
              />
            </div>

            {/* External URL */}
            <div className="mb-4 flex items-center">
              <label className="block font-medium text-black mr-2">External URL</label>
              <div
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                  formData.externalUrl ? "bg-green-400" : ""
                }`}
                onClick={() => handleToggle("externalUrl")}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                    formData.externalUrl ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
            </div>

            {/* Open In New Tab */}
            <div className="mb-4 flex items-center">
              <label className="block font-medium text-black mr-2">Open In New Tab</label>
              <div
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                  formData.openInNewTab ? "bg-green-400" : ""
                }`}
                onClick={() => handleToggle("openInNewTab")}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                    formData.openInNewTab ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
            </div>

            {/* External URL Address */}
            <div className="mb-4">
              <label className="block font-medium mb-1 text-black">External URL Address</label>
              <input
                type="text"
                name="externalUrlAddress"
                value={formData.externalUrlAddress}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-400 rounded bg-gray-200 text-black"
                placeholder="Enter URL address"
              />
            </div>

            {/* Pages */}
            <div className="mb-4">
              <label className="block font-medium mb-1 text-black">Pages</label>
              <select
                name="selectedPage"
                value={formData.selectedPage}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-400 rounded bg-gray-200 text-black"
              >
                <option value="">Select</option>
                {menuItems.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="w-[120px] bg-gray-800 text-white font-bold py-1 rounded mx-auto ml-40 mt-6 ml-80"
              onClick={() => setLeftView("default")}
            >
              Save
            </button>
          </>
        )}
      </div>

      {/* Right Side: Menu List */}
      <div className="bg-gray-100 p-6 rounded shadow-lg w-full md:w-1/3">
        <h3 className="text-xl font-semibold mb-4 text-black">Menu List</h3>

        {/* Conditionally render menu lists */}
        {menuView === "mainMenu" ? (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left text-black">Title</th>
                <th className="p-2 text-left text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 text-black">Main Menu</td>
                <td className="p-2">
                  <button
                    onClick={() => {
                      setMenuView("submenu");
                      setLeftView("addMenuItem");
                    }}
                    className="bg-gray-500 text-white py-1 px-2 rounded"
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-2 text-black">Bottom Menu</td>
                <td className="p-2">
                  <button
                    onClick={() => {
                      setMenuView("submenu");
                      setLeftView("addMenuItem");
                    }}
                    className="bg-gray-500 text-white py-1 px-2 rounded"
                  >
                    +
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left text-black">Title</th>
                <th className="p-2 text-left text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 text-black">{item}</td>
                  <td className="p-2 flex gap-2 items-center">
                    <span className="text-gray-500 cursor-pointer">
                      <FaEdit size="" /> {/* Edit icon in small size and gray color */}
                    </span>
                    <span className="text-gray-500 cursor-pointer">
                      <FaTimes size="" /> {/* Cross mark (delete) icon in small size and gray color */}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Lesson;
