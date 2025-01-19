import React, { useState } from "react";
import { FaFilePdf, FaFileCsv, FaFileExcel, FaCopy, FaPrint, FaColumns, FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import Data from "./Data";

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [sidebarEnabled, setSidebarEnabled] = useState(false);
  const [showMediaManager, setShowMediaManager] = useState(false); // For toggling the media manager
  const [mediaKeyword, setMediaKeyword] = useState(""); // Keyword input for media search
  const [mediaFileType, setMediaFileType] = useState(""); // File type filter for media search
  const [descriptionWidth, setDescriptionWidth] = useState("w-full"); // Width of the description field
  const [selectedImage, setSelectedImage] = useState(null); // For storing selected image

  const newsData = [
    { title: "Try", url: "https://school.gtechxchange.com/read/try-1" },
    { title: "Example", url: "https://school.gtechxchange.com/read/example" },
  ];

  const filteredNews = newsData.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle image selection (this is a placeholder for your actual image selection logic)
  const handleImageSelect = () => {
    // Logic to select an image would go here, for now we will simulate selecting an image.
    setSelectedImage("https://via.placeholder.com/150");
  };

  // Function to handle image deletion
  const handleImageDelete = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">News List</h1>
        {/* Add Button */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="ml-auto px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            + Add
          </button>
        )}
      </div>

      {/* Add News Form (Displayed when + Add is clicked) */}
      {showAddForm && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Right Side: Add News */}
          <div className="bg-white p-4 rounded-lg shadow-md w-full lg:w-2/3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add News</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Title *</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                placeholder="Enter title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Date *</label>
              <input
                type="date"
                className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Description *</label>
              <button
                  onClick={() => {
                    setShowMediaManager(true);
                    setDescriptionWidth("w-3/2"); // Change width when Add Media is clicked
                  }}
                  className="px-2 py-0 bg-gray-500 text-white ml-80 text-lg rounded hover:bg-gray-400 w-auto"
                >
                  + Add Media
                </button>
              <div className="flex items-center gap-4">

                <Data />
                {/* Corrected Add Media Button with fixed width/height */}
                
              </div>
            </div>
          </div>

          {/* Left Side: Sidebar Settings */}
          <div className="bg-white p-4 rounded-lg shadow-md w-full lg:w-1/3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sidebar Settings</h3>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-gray-700 font-medium">Sidebar</span>
              <div
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${sidebarEnabled ? "bg-green-400" : ""}`}
                onClick={() => setSidebarEnabled(!sidebarEnabled)}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform ${sidebarEnabled ? "translate-x-6" : ""}`}
                ></div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Featured Image</label>
              <div className="flex items-center gap-4">
                {/* If an image is selected, show it, otherwise show the select button */}
                {selectedImage ? (
                  <div className="flex items-center gap-2">
                    <img src={selectedImage} alt="Selected" className="w-20 h-20 object-cover rounded" />
                    <button
                      onClick={handleImageDelete}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleImageSelect}
                    className="w-full py-2 border rounded bg-gray-50 text-gray-700 hover:bg-gray-100"
                  >
                    Please Select Image
                  </button>
                )}
              </div>
            </div>
            {/* Save Button */}
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Manager Modal */}
      {showMediaManager && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Media Manager</h3>
            <div className="mb-4 flex gap-12">
              <div className="w-1/3">
                <label className="block text-gray-700 font-medium mb-1">Search By File Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  placeholder="Enter Keyword..."
                  value={mediaKeyword}
                  onChange={(e) => setMediaKeyword(e.target.value)}
                />
              </div>
              <div className="w-1/3">
                <label className="block text-gray-700 font-medium mb-1">Filter By File Type</label>
                <select
                  value={mediaFileType}
                  onChange={(e) => setMediaFileType(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="">Select File Type</option>
                  <option value="image">Images</option>
                  <option value="pdf">PDF</option>
                  <option value="word">Word</option>
                  <option value="excel">Excel</option>
                  <option value="zip">ZIP</option>
                  <option value="rar">RAR</option>
                  <option value="video">Video</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowMediaManager(false)}
                className="px-4 py-2  mr-80 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={() => alert("Media added!")}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News Table (Displayed when Add Form is not active) */}
      {!showAddForm && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-3 border-b text-left">Title</th>
                  <th className="px-4 py-3 border-b text-left">URL</th>
                  <th className="px-4 py-3 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((news, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-3 border-b">{news.title}</td>
                    <td className="px-4 py-3 border-b text-blue-600 underline">
                      <a href={news.url} target="_blank" rel="noopener noreferrer">
                        {news.url}
                      </a>
                    </td>
                    <td className="px-4 py-3 border-b flex gap-2">
                      <FaEdit className="text-gray-500 text-lg cursor-pointer" title="Edit" />
                      <FaTimes className="text-gray-500 text-lg cursor-pointer" title="Close" />
                    </td>
                  </tr>
                ))}
                {filteredNews.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-4 py-3 border-b text-center text-gray-500"
                    >
                      No News Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
