import React, { useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";

const Pages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Updated data with Page Type
  const newsData = [
    { title: "Home", url: "https://school.gtechxchange.com/page/home", pageType: "Standard" },
    { title: "Complain", url: "https://school.gtechxchange.com/page/complain", pageType: "Standard" },
    { title: "404 page", url: "https://school.gtechxchange.com/page/404-page", pageType: "Standard" },
    { title: "Contact us", url: "https://school.gtechxchange.com/page/contact-us", pageType: "Standard" },
  ];

  const filteredNews = newsData.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Page List</h1>
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

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* News Table */}
      {!showAddForm && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-3 border-b text-left">Title</th>
                  <th className="px-4 py-3 border-b text-left">URL</th>
                  <th className="px-4 py-3 border-b text-left">Page Type</th>
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
                    <td className="px-4 py-3 border-b">{news.pageType}</td>
                    <td className="px-4 py-3 border-b flex gap-2">
                      <FaEdit className="text-gray-500 text-lg cursor-pointer" title="Edit" />
                      <FaTimes className="text-gray-500 text-lg cursor-pointer" title="Close" />
                    </td>
                  </tr>
                ))}
                {filteredNews.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-3 border-b text-center text-gray-500"
                    >
                      No Pages Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white p-4 rounded-lg shadow-md w-full lg:w-2/3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Page</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Title *</label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">URL *</label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="Enter URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Page Type *</label>
            <select
              className="w-full p-2 border 
              rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option value="Standard">Standard</option>
              <option value="Events">Events</option>
              <option value="News">News</option>
              <option value="Gallery">Gallery</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pages;
