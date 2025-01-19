import React, { useState } from "react";
import { FaFileExcel, FaFilePdf, FaCopy, FaPrint, FaFileCsv, FaTimes } from "react-icons/fa"; // Import icons
import { jsPDF } from "jspdf"; // Import jsPDF
import * as XLSX from "xlsx"; // Import XLSX

const Topic = () => {
  const [topics, setTopics] = useState([]);
  const [formData, setFormData] = useState({
    class: "",
    section: "",
    subjectGroup: "",
    subject: "",
    lesson: "",
    topicNames: [""], // Initialize with one topic name input
  });
  const [rowsPerPage, setRowsPerPage] = useState(50); // Added state for rows per page

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "topicName") {
      const updatedTopicNames = [...formData.topicNames];
      updatedTopicNames[index] = value;
      setFormData({ ...formData, topicNames: updatedTopicNames });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddMore = () => {
    setFormData({ ...formData, topicNames: [...formData.topicNames, ""] });
  };

  const handleRemoveTopic = (index) => {
    const updatedTopicNames = formData.topicNames.filter((_, i) => i !== index);
    setFormData({ ...formData, topicNames: updatedTopicNames });
  };

  const handleSave = () => {
    if (
      formData.class &&
      formData.section &&
      formData.subjectGroup &&
      formData.subject &&
      formData.lesson &&
      formData.topicNames.every((name) => name.trim() !== "")
    ) {
      const topicsToAdd = formData.topicNames.map((topicName) => ({
        class: formData.class,
        section: formData.section,
        subjectGroup: formData.subjectGroup,
        subject: formData.subject,
        lesson: formData.lesson,
        topicName,
      }));
      setTopics([...topics, ...topicsToAdd]);
      setFormData({
        class: "",
        section: "",
        subjectGroup: "",
        subject: "",
        lesson: "",
        topicNames: [""],
      });
    } else {
      alert("Please fill all fields.");
    }
  };

  // PDF Export Handler
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const table = document.getElementById("topic-table");
    doc.autoTable({ html: table });
    doc.save("topics.pdf");
  };

  // Excel Export Handler
  const handleDownloadExcel = () => {
    const table = document.getElementById("topic-table");
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(wb, "topics.xlsx");
  };

  // CSV Export Handler
  const handleDownloadCSV = () => {
    const table = document.getElementById("topic-table");
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(wb, "topics.csv", { bookType: "csv" });
  };

  // Copy Table Data to Clipboard Handler
  const handleCopyToClipboard = () => {
    const table = document.getElementById("topic-table");
    const range = document.createRange();
    range.selectNode(table);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 p-4">
      {/* Left Side - Add Topic Form */}
      <div className="bg-white p-3 rounded shadow-lg dark:bg-gray-500 dark:text-white">
        <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">Add Topic</h3>
        <div className="mb-2">
          <label className="text-black dark:text-white">Class *</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="text-black dark:text-white">Section *</label>
          <select
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="text-black dark:text-white">Subject Group *</label>
          <select
            name="subjectGroup"
            value={formData.subjectGroup}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select</option>
            <option value="Science">Science</option>
            <option value="Arts">Arts</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="text-black dark:text-white">Subject *</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select</option>
            <option value="Math">Math</option>
            <option value="English">English</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="text-black dark:text-white">Lesson *</label>
          <select
            name="lesson"
            value={formData.lesson}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select</option>
            <option value="Lesson 1">Lesson 1</option>
            <option value="Lesson 2">Lesson 2</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleAddMore}
          className="bg-gray-600 text-white py-1 px-2 rounded mb-4"
        >
          Add More
        </button>
        {formData.topicNames.map((topicName, index) => (
          <div key={index} className="mb-2 flex items-center gap-2">
            <input
              type="text"
              name="topicName"
              value={topicName}
              onChange={(e) => handleInputChange(e, index)}
              placeholder={`Topic Name ${index + 1}`}
              className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:text-white"
            />
            {formData.topicNames.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveTopic(index)}
                className="text-red-500"
              >
                <FaTimes />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleSave}
          className="w-full bg-gray-500 text-white py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* Right Side - Topic List */}
      <div className="bg-white p-3 rounded shadow-lg dark:bg-gray-500 dark:text-white md:col-span-2">
        <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">Topic List</h3>
        <div className="flex justify-between items-center mb-2">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded w-1/3 bg-white dark:bg-gray-700 dark:text-white"
          />
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            className="p-1 border ml-5 border-gray-300 rounded w-14 bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value="all">All</option>
          </select>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start ">
            <FaCopy 
              onClick={handleCopyToClipboard} 
              title="Copy" 
              className="text-xl cursor-pointer text-gray-800" 
            />
            <FaPrint 
              onClick={handleCopyToClipboard}
              title="Print" 
              className="text-xl cursor-pointer text-gray-800" 
            />
            <FaFilePdf 
              onClick={handleDownloadPDF} 
              title="Export to PDF" 
              className="text-xl cursor-pointer text-gray-800" 
            />
            <FaFileCsv 
              onClick={handleDownloadCSV} 
              title="Export to CSV" 
              className="text-xl cursor-pointer text-gray-800" 
            />
            <FaFileExcel 
              onClick={handleDownloadExcel} 
              title="Export to Excel" 
              className="text-xl cursor-pointer text-gray-800" 
            />
          </div>
        </div>
        <table id="topic-table" className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-black dark:text-white">Class</th>
              <th className="border px-2 py-1 text-black dark:text-white">Section</th>
              <th className="border px-2 py-1 text-black dark:text-white">Subject</th>
              <th className="border px-2 py-1 text-black dark:text-white">Lesson</th>
              <th className="border px-2 py-1 text-black dark:text-white">Topic Name</th>
            </tr>
          </thead>
          <tbody>
            {topics.slice(0, rowsPerPage === "all" ? topics.length : rowsPerPage).map((topic, index) => (
              <tr key={index}>
                <td className="border px-2 py-1 text-black dark:text-white">{topic.class}</td>
                <td className="border px-2 py-1 text-black dark:text-white">{topic.section}</td>
                <td className="border px-2 py-1 text-black dark:text-white">{topic.subject}</td>
                <td className="border px-2 py-1 text-black dark:text-white">{topic.lesson}</td>
                <td className="border px-2 py-1 text-black dark:text-white">{topic.topicName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Topic;
