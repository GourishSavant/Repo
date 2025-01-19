import React, { useState } from 'react';
import {
  FaFilePdf,
  FaFileExcel,
  FaPrint,
  FaFileCsv,
  FaCopy,
  FaColumns,
  FaEdit,
  FaTimes,
} from 'react-icons/fa';
import Data from './Data';
import jsPDF from 'jspdf';

const EventList = () => {
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [eventList, setEventList] = useState([
    { title: 'Annual Programmes', fromDate: '2024-12-22', toDate: '2024-12-23', venue: 'Hall A', description: 'Annual celebration' },
    { title: 'SVFD', fromDate: '2024-12-29', toDate: '2024-12-30', venue: 'Hall B', description: 'Special program' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [columnsDropdownOpen, setColumnsDropdownOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    title: true,
    date: true,
    venue: true,
    action: true,
  });

  const [newEvent, setNewEvent] = useState({
    title: '',
    venue: '',
    fromDate: '',
    toDate: '',
    description: '',
    sidebarSetting: '',
    featuredImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewEvent((prevState) => ({
      ...prevState,
      featuredImage: e.target.files[0],
    }));
  };

  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.fromDate || !newEvent.toDate || !newEvent.description) {
      alert('Please fill in all required fields.');
      return;
    }

    setEventList([...eventList, newEvent]);
    setNewEvent({
      title: '',
      venue: '',
      fromDate: '',
      toDate: '',
      description: '',
      sidebarSetting: '',
      featuredImage: null,
    });
    setShowAddEventForm(false);
  };

  const toggleDropdown = () => {
    setColumnsDropdownOpen(!columnsDropdownOpen);
  };

  const toggleColumnVisibility = (column) => {
    setColumnVisibility((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  const filteredEvents = eventList.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to download the event list as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Event List', 14, 10);
    let y = 20;
    filteredEvents.forEach((event) => {
      doc.text(`Title: ${event.title}`, 14, y);
      doc.text(`From: ${event.fromDate} To: ${event.toDate}`, 14, y + 10);
      doc.text(`Venue: ${event.venue}`, 14, y + 20);
      doc.text(`Description: ${event.description}`, 14, y + 30);
      y += 40;
    });
    doc.save('event_list.pdf');
  };

  return (
    <div className="flex h-screen text-black relative bg-white">
      {/* Event List Section */}
      <div className="flex flex-col w-3/4 p-5 bg-white shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Event List</h2>
          <button
            className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
            onClick={() => setShowAddEventForm(true)}
          >
            + Add
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/4 p-2 border rounded bg-white"
          />
          {/* Icons Section */}
          <div className="flex items-center space-x-4">
            <FaFilePdf
              onClick={downloadPDF}
              className="text-gray-500 cursor-pointer hover:scale-110"
              title="Export as PDF"
            />
            <FaFileExcel className="text-gray-500 cursor-pointer hover:scale-110" title="Export as Excel" />
            <FaPrint className="text-gray-500 cursor-pointer hover:scale-110" title="Print" />
            <FaFileCsv className="text-gray-500 cursor-pointer hover:scale-110" title="Export as CSV" />
            <FaCopy className="text-gray-500 cursor-pointer hover:scale-110" title="Copy" />
            <div className="relative">
              <FaColumns
                onClick={toggleDropdown}
                className="text-gray-500 cursor-pointer hover:scale-110"
                title="Column View"
              />
              {columnsDropdownOpen && (
                <div className="absolute right-0 top-8 bg-white shadow-md border rounded p-2 w-48 z-10">
                  <label className="block mb-2 font-medium">Column Visibility</label>
                  {Object.keys(columnVisibility).map((key) => (
                    <div key={key} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={columnVisibility[key]}
                        onChange={() => toggleColumnVisibility(key)}
                        className="mr-2"
                      />
                      <span className="capitalize">{key}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {columnVisibility.title && <th className="border p-2 bg-gray-100">Title</th>}
              {columnVisibility.date && <th className="border p-2 bg-gray-100">Date</th>}
              {columnVisibility.venue && <th className="border p-2 bg-gray-100">Venue</th>}
              {columnVisibility.action && <th className="border p-2 bg-gray-100">Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <tr key={index}>
                  {columnVisibility.title && <td className="border p-2">{event.title}</td>}
                  {columnVisibility.date && (
                    <td className="border p-2">
                      {event.fromDate} - {event.toDate}
                    </td>
                  )}
                  {columnVisibility.venue && <td className="border p-2">{event.venue}</td>}
                  {columnVisibility.action && (
                    <td className="border p-2 flex justify-center items-center space-x-3">
                      <FaEdit
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                        title="Edit Event"
                      />
                      <FaTimes
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        title="Delete Event"
                      />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center text-gray-500" colSpan="4">
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Event Form */}
      {showAddEventForm && (
        <div className="absolute inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white p-3 rounded shadow-lg w-full md:w-3/4 lg:w-2/3">
            <h3 className="text-xl font-bold mb-4">Add Event</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block font-medium mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded bg-white"
                      placeholder="Event Title"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium mb-1">Venue</label>
                    <input
                      type="text"
                      name="venue"
                      value={newEvent.venue}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded bg-white"
                      placeholder="Event Venue"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium mb-1">Event Start</label>
                    <input
                      type="date"
                      name="fromDate"
                      value={newEvent.fromDate}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded bg-white"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium mb-1">Event End</label>
                    <input
                      type="date"
                      name="toDate"
                      value={newEvent.toDate}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded bg-white"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <Data />
                    <textarea
                      name="description"
                      value={newEvent.description}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded bg-white"
                      placeholder="Event Description"
                      required
                    ></textarea>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="block font-medium mb-1">Sidebar Setting</label>
                    <select
                      name="sidebarSetting"
                      value={newEvent.sidebarSetting}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded bg-white"
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
                      onChange={handleFileChange}
                      className="w-full border p-2 rounded bg-white"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setShowAddEventForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={handleSaveEvent}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
