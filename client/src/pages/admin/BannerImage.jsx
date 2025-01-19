import React, { useState } from "react";

const BannerImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [fileType, setFileType] = useState("");

  // Sample Media Data
  const mediaFiles = [
    { name: "SampleImage1.jpg", type: "image" },
    { name: "SampleVideo1.mp4", type: "video" },
    { name: "Document.pdf", type: "pdf" },
    { name: "Spreadsheet.xlsx", type: "excel" },
    { name: "Presentation.pptx", type: "word" },
    { name: "Archive.rar", type: "rar" },
    { name: "Notes.txt", type: "text" },
    { name: "MiscellaneousFile.dat", type: "other" },
  ];

  const handleAddImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  // Filter media files based on the search keyword and file type
  const filteredFiles = mediaFiles.filter((file) => {
    const matchesKeyword =
      searchKeyword === "" || file.name.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesFileType = fileType === "" || file.type === fileType;
    return matchesKeyword && matchesFileType;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Banner Section */}
      <div className="bg-white w-full max-w-5xl mx-auto rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Banner Image</h1>
        <button
          onClick={handleAddImageClick}
          className="px-4 py-2 bg-black text-white rounded shadow hover:bg-gray-800"
        >
          + Add Image
        </button>
      </div>

      {/* Modal for Add Image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 ml-10">
          <div className="bg-white w-full max-w-4xl mx-auto rounded-lg shadow-lg p-6">
            {/* Modal Header */}
            <h2 className="text-xl font-bold text-black text-center mb-8 mr-40">Media Manager</h2>

            {/* Search and Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Search By File Name */}
              <div>
                <label className="block text-lg font-semibold text-black mb-2">
                  Search By File Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Keyword..."
                  value={searchKeyword}
                  onChange={handleSearchChange}
                  className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black text-black"
                />
              </div>

              {/* Filter By File Type */}
              <div>
                <label className="block text-lg font-semibold text-black mb-2">
                  Filter By File Type
                </label>
                <select
                  value={fileType}
                  onChange={handleFileTypeChange}
                  className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black text-black"
                >
                  <option value="">All</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                  <option value="text">Text Files</option>
                  <option value="rar">RAR Files</option>
                  <option value="word">Word Documents</option>
                  <option value="excel">Excel Spreadsheets</option>
                  <option value="pdf">PDF Files</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Empty Grid for Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* No files displayed, only filter functionality */}
              {filteredFiles.length > 0 ? (
                <div className="col-span-full text-center text-gray-500">
                </div>
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No files found.
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => alert("Image Added!")}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerImage;
