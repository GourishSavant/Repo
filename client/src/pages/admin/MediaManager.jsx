import React, { useState } from "react";

const MediaManager = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [fileType, setFileType] = useState("");

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleYoutubeUrlChange = (event) => {
    setYoutubeUrl(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-6xl space-y-6">
        {/* Media Manager Title */}
        <h1 className="text-2xl font-bold text-black mb-6 text-center">Media Manager</h1>

        {/* Upload Sections (Horizontal) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 bg-gray-50 rounded-lg shadow-md">
          {/* Upload Your File */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2 text-black">Upload Your File</h2>
            <div
              className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center relative bg-white hover:bg-gray-100 hover:border-blue-500"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <p className="text-gray-600 mb-2">Drag and drop a file here or click</p>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          {/* OR Divider */}
          <div className="hidden lg:flex items-center justify-center">
            <span className="px-4 text-black font-semibold">OR</span>
          </div>

          {/* Upload YouTube Video Link */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2 text-black">Upload YouTube Video Link *</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Enter YouTube URL"
                value={youtubeUrl}
                onChange={handleYoutubeUrlChange}
                className="flex-1 p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <button
                onClick={() => alert("YouTube Video URL Submitted")}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search By File Name */}
            <div>
              <h2 className="text-lg font-semibold mb-2 text-black">Search By File Name</h2>
              <input
                type="text"
                placeholder="Enter Keyword..."
                value={searchKeyword}
                onChange={handleSearchChange}
                className="w-full p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            {/* Filter By File Type */}
            <div>
              <h2 className="text-lg font-semibold mb-2 text-black">Filter By File Type</h2>
              <select
                value={fileType}
                onChange={handleFileTypeChange}
                className="w-full p-2 border rounded border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="">Select</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="rar">RAR</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaManager;
