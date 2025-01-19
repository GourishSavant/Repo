import React, { useState } from 'react';
import { FaFilePdf, FaFileExcel, FaPrint, FaFileCsv, FaCopy, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { jsPDF } from "jspdf"; // PDF library
import * as XLSX from 'xlsx'; // Excel library

const Event = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [newEvent, setNewEvent] = useState({
    eventFor: "",
    title: "",
    fromDate: "",
    toDate: "",
    note: "",
    notifyEmail: false,
    notifySMS: false,
    templateId: "",
  });

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const generateCalendar = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(month, year);
    const calendar = [];

    let day = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > totalDays) {
          week.push(null);
        } else {
          week.push(day++);
        }
      }
      calendar.push(week);
    }
    return calendar;
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    setEventList([...eventList, newEvent]);
    setShowAddEventForm(false);
    setNewEvent({
      eventFor: "",
      title: "",
      fromDate: "",
      toDate: "",
      note: "",
      notifyEmail: false,
      notifySMS: false,
      templateId: "",
    });
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const calendar = generateCalendar(month, year);

  // Returns the events scheduled for a specific day
  const getEventByDate = (day) => {
    const targetDate = new Date(year, month, day);
    return eventList.filter(event => {
      const eventDateFrom = new Date(event.fromDate);
      const eventDateTo = new Date(event.toDate);
      return targetDate >= eventDateFrom && targetDate <= eventDateTo;
    });
  };

  // Handle PDF Download
  const downloadPDF = () => {
    const doc = new jsPDF();
    let eventContent = 'Event List\n\n';
    eventList.forEach((event, index) => {
      eventContent += `${index + 1}. ${event.title} - ${event.fromDate} to ${event.toDate}\n`;
    });
    doc.text(eventContent, 10, 10);
    doc.save('events.pdf');
  };

  // Handle Excel Download
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(eventList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Events');
    XLSX.writeFile(workbook, 'events.xlsx');
  };

  // Handle CSV Download
  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + eventList.map(event =>
        `${event.title},${event.eventFor},${event.fromDate},${event.toDate}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "events.csv");
    link.click();
  };

  // Handle Copy Content
  const copyContent = () => {
    const eventData = eventList.map(event =>
      `${event.title} (${event.fromDate} to ${event.toDate})`).join('\n');
    navigator.clipboard.writeText(eventData).then(() => {
      alert("Event list copied to clipboard!");
    });
  };

  return (
    <div className="flex h-screen text-black">
      {/* Calendar Section */}
      <div className="flex flex-col w-full md:w-1/2 border-r bg-white">
        <div className="flex items-center justify-between p-5 bg-gray-200">
          <FaArrowLeft
            className="cursor-pointer text-xl hover:scale-110"
            onClick={prevMonth}
          />
          <h2 className="text-xl font-bold">
            {months[month]} {year}
          </h2>
          <FaArrowRight
            className="cursor-pointer text-xl hover:scale-110"
            onClick={nextMonth}
          />
        </div>
        <div className="overflow-y-auto p-5">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-100">Sun</th>
                <th className="border p-2 bg-gray-100">Mon</th>
                <th className="border p-2 bg-gray-100">Tue</th>
                <th className="border p-2 bg-gray-100">Wed</th>
                <th className="border p-2 bg-gray-100">Thu</th>
                <th className="border p-2 bg-gray-100">Fri</th>
                <th className="border p-2 bg-gray-100">Sat</th>
              </tr>
            </thead>
            <tbody>
              {calendar.map((week, i) => (
                <tr key={i}>
                  {week.map((day, j) => {
                    const eventsOnDay = day ? getEventByDate(day) : [];
                    return (
                      <td
                        key={j}
                        className={`border p-2 text-center ${day && eventsOnDay.length > 0 ? 'bg-yellow-100' : ''}`}
                      >
                        {day || ""}
                        {eventsOnDay.length > 0 && (
                          <div className="text-xs text-blue-500">
                            {eventsOnDay.map((event, index) => (
                              <div key={index}>{event.title}</div>
                            ))}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event List Section */}
      <div className="flex flex-col w-full md:w-1/2 p-5 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Event List</h2>
          <button
            className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
            onClick={() => setShowAddEventForm(true)}
          >
            Add Event
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/4 p-2 border rounded bg-white"
          />
          <div className="flex space-x-4 text-xl">
            <FaFilePdf
              className="text-gray-500 cursor-pointer hover:scale-110"
              title="Export as PDF"
              onClick={downloadPDF}
            />
            <FaFileExcel
              className="text-gray-500 cursor-pointer hover:scale-110"
              title="Export as Excel"
              onClick={downloadExcel}
            />
            <FaPrint className="text-gray-500 cursor-pointer hover:scale-110" title="Print" />
            <FaFileCsv
              className="text-gray-500 cursor-pointer hover:scale-110"
              title="Export as CSV"
              onClick={downloadCSV}
            />
            <FaCopy
              className="text-gray-500 cursor-pointer hover:scale-110"
              title="Copy"
              onClick={copyContent}
            />
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100">Event Title</th>
              <th className="border p-2 bg-gray-100">Class</th>
              <th className="border p-2 bg-gray-100">Section</th>
              <th className="border p-2 bg-gray-100">From</th>
              <th className="border p-2 bg-gray-100">To</th>
              <th className="border p-2 bg-gray-100">Action</th>
            </tr>
          </thead>
          <tbody>
            {eventList.length > 0 ? (
              eventList.map((event, index) => (
                <tr key={index}>
                  <td className="border p-2">{event.title}</td>
                  <td className="border p-2">{event.eventFor}</td>
                  <td className="border p-2">-</td>
                  <td className="border p-2">{event.fromDate}</td>
                  <td className="border p-2">{event.toDate}</td>
                  <td className="border p-2">-</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center text-gray-500" colSpan="6">
                  No data available in the table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddEventForm && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">Add Event</h3>
            <form onSubmit={handleAddEvent}>
              <div className="mb-4">
                <label className="block font-medium mb-1">Event For *</label>
                <select
                  name="eventFor"
                  className="w-full border p-2 rounded bg-white"
                  value={newEvent.eventFor}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="All Alumni">All Alumni</option>
                  <option value="Class">Class</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Event Title *</label>
                <input
                  type="text"
                  name="title"
                  className="w-full border p-2 rounded bg-white"
                  value={newEvent.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Event From Date *</label>
                <input
                  type="date"
                  name="fromDate"
                  className="w-full border p-2 rounded bg-white"
                  value={newEvent.fromDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Event To Date *</label>
                <input
                  type="date"
                  name="toDate"
                  className="w-full border p-2 rounded bg-white"
                  value={newEvent.toDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Photo (100px X 100px)</label>
                <input type="file" className="w-full border p-2 rounded" />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Note</label>
                <textarea
                  name="note"
                  className="w-full border p-2 rounded bg-white"
                  value={newEvent.note}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Event Notification Message</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="notifyEmail"
                      className="mr-2"
                      checked={newEvent.notifyEmail}
                      onChange={handleInputChange}
                    />
                    Email
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="notifySMS"
                      className="mr-2"
                      checked={newEvent.notifySMS}
                      onChange={handleInputChange}
                    />
                    SMS
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Template ID</label>
                <input
                  type="text"
                  name="templateId"
                  className="w-full border p-2 rounded bg-white"
                  value={newEvent.templateId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setShowAddEventForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
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

export default Event;
