import React, { useState } from 'react';
import {
  FaSearch,
  FaFilePdf,
  FaPrint,
  FaFileExcel,
  FaFileCsv,
  FaCopy,
  FaColumns,
  FaEdit,
  FaTimes,
} from 'react-icons/fa';
import Data from './Data';

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [galleryItems, setGalleryItems] = useState([
    { title: 'try', url: 'https://school.gtechxchange.com/read/try' },
    { title: 'ffdandgn', url: 'https://school.gtechxchange.com/read/ffdandgn' },
  ]);
  const [newGallery, setNewGallery] = useState({
    title: '',
    image: null,
    featuredImage: null,
    sidebarSetting: '',
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGallery({ ...newGallery, [name]: value });
  };

  const handleAddGallery = () => {
    if (editingItem) {
      const updatedItems = galleryItems.map((item) =>
        item.title === editingItem.title ? newGallery : item
      );
      setGalleryItems(updatedItems);
    } else {
      setGalleryItems([...galleryItems, newGallery]);
    }
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewGallery(item);
    setShowAddForm(true);
  };

  const handleDelete = (item) => {
    setGalleryItems(galleryItems.filter((i) => i.title !== item.title));
  };

  const filteredItems = galleryItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100 text-gray-800">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Gallery List</h1>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => setShowAddForm(true)}
        >
          + Add
        </button>
      </div>

      {/* Search Bar and Icons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center bg-white border rounded w-full max-w-md px-3 py-2 mr-6">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow outline-none bg-transparent"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex gap-3">
          <button className="text-gray-500 hover:text-gray-600 text-xl">
            <FaColumns title="Columns" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 text-xl">
            <FaFilePdf title="Export to PDF" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 text-xl">
            <FaPrint title="Print" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 text-xl">
            <FaFileExcel title="Export to Excel" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 text-xl">
            <FaFileCsv title="Export to CSV" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 text-xl">
            <FaCopy title="Copy" />
          </button>
        </div>
      </div>

      {/* Gallery Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left px-4 py-2">Title</th>
              <th className="text-left px-4 py-2">URL</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {item.url}
                    </a>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="text-gray-500 hover:text-gray-600 text-lg"
                      title="Edit"
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-600 text-lg"
                      title="Remove"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center px-4 py-4">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Gallery Form */}
      {showAddForm && (
        <div className="absolute inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg w-full sm:w-[70%] lg:w-[60%]">
            <h3 className="text-xl font-bold mb-4">{editingItem ? 'Edit Gallery' : 'Add Gallery'}</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left side - Title */}
                <div className="flex-1">
                  <div className="mb-4">
                    <label className="block font-medium mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                                        <input
                      type="text"
                      name="title"
                      value={newGallery.title}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded bg-gray-100"
                      placeholder="Gallery Title"
                      required
                    />
                    <Data/>
                  </div>
                </div>

                {/* Right side - Sidebar Setting, Featured Image */}
                <div className="flex-1 lg:w-1/3">
                  <div className="mb-4">
                    <label className="block font-medium mb-1">Sidebar Setting</label>
                    <select
                      name="sidebarSetting"
                      value={newGallery.sidebarSetting}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded bg-gray-100"
                    >
                      <option value="">Select Sidebar Setting</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium mb-1">Featured Image</label>
                    <input
                      type="file"
                      name="featuredImage"
                      onChange={(e) =>
                        setNewGallery({ ...newGallery, featuredImage: e.target.files[0] })
                      }
                      className="w-full border p-2 rounded bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={handleAddGallery}
                >
                  {editingItem ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
