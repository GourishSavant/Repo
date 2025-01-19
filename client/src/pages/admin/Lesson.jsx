import React, { useState } from "react";
import {
  FaFileExcel,
  FaFilePdf,
  FaCopy,
  FaPrint,
  FaFileCsv,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

const Lesson = () => {
  const [lessons, setLessons] = useState([]);
  const [formData, setFormData] = useState({
    class: "",
    section: "",
    subjectGroup: "",
    subject: "",
    lessonNames: [""],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "lessonName") {
      const updatedLessonNames = [...formData.lessonNames];
      updatedLessonNames[index] = value;
      setFormData({ ...formData, lessonNames: updatedLessonNames });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddMore = () => {
    setFormData({ ...formData, lessonNames: [...formData.lessonNames, ""] });
  };

  const handleRemoveLessonName = (index) => {
    const updatedLessonNames = formData.lessonNames.filter((_, i) => i !== index);
    setFormData({ ...formData, lessonNames: updatedLessonNames });
  };

  const handleSave = () => {
    if (
      formData.class &&
      formData.section &&
      formData.subjectGroup &&
      formData.subject &&
      formData.lessonNames.every((name) => name.trim() !== "")
    ) {
      const lessonsToAdd = formData.lessonNames.map((lessonName) => ({
        class: formData.class,
        section: formData.section,
        subjectGroup: formData.subjectGroup,
        subject: formData.subject,
        lessonName,
      }));
      setLessons([...lessons, ...lessonsToAdd]);
      setFormData({
        class: "",
        section: "",
        subjectGroup: "",
        subject: "",
        lessonNames: [""],
      });
    } else {
      alert("Please fill all fields.");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLessons = lessons.slice(startIndex, startIndex + itemsPerPage);

  // Export functions
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Lesson List", 10, 10);
    let y = 20;
    lessons.forEach((lesson, index) => {
      doc.text(
        `${index + 1}. Class: ${lesson.class}, Section: ${lesson.section}, Subject Group: ${lesson.subjectGroup}, Subject: ${lesson.subject}, Lesson: ${lesson.lessonName}`,
        10,
        y
      );
      y += 10;
    });
    doc.save("lessons.pdf");
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Class,Section,Subject Group,Subject,Lesson"]
        .concat(
          lessons.map(
            (lesson) =>
              `${lesson.class},${lesson.section},${lesson.subjectGroup},${lesson.subject},${lesson.lessonName}`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lessons.csv");
    document.body.appendChild(link);
    link.click();
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(lessons);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lessons");
    XLSX.writeFile(workbook, "lessons.xlsx");
  };

  const handleCopyToClipboard = () => {
    const textToCopy = lessons
      .map(
        (lesson) =>
          `Class: ${lesson.class}, Section: ${lesson.section}, Subject Group: ${lesson.subjectGroup}, Subject: ${lesson.subject}, Lesson: ${lesson.lessonName}`
      )
      .join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<h1>Lesson List</h1><ul>");
    lessons.forEach((lesson) => {
      printWindow.document.write(
        `<li>Class: ${lesson.class}, Section: ${lesson.section}, Subject Group: ${lesson.subjectGroup}, Subject: ${lesson.subject}, Lesson: ${lesson.lessonName}</li>`
      );
    });
    printWindow.document.write("</ul>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 p-4">
      {/* Left Side - Add Lesson */}
      <div className="bg-white p-3 rounded shadow-lg dark:bg-gray-700 dark:text-white md:col-span-1">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add Lesson</h3>
        <div className="mb-2">
          <label className="text-black dark:text-white">Class *</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-400 rounded bg-white dark:bg-gray-600 dark:text-white"
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
            className="mt-1 block w-full p-2 border border-gray-400 rounded bg-white dark:bg-gray-600 dark:text-white"
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
            className="mt-1 block w-full p-2 border border-gray-400 rounded bg-white dark:bg-gray-600 dark:text-white"
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
            className="mt-1 block w-full p-2 border border-gray-400 rounded bg-white dark:bg-gray-600 dark:text-white"
          >
            <option value="">Select</option>
            <option value="Math">Math</option>
            <option value="English">English</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleAddMore}
          className="bg-gray-600 text-white py-1 px-2 rounded mb-4"
        >
          Add More
        </button>
        {formData.lessonNames.map((lessonName, index) => (
          <div key={index} className="mb-2 flex items-center gap-2">
            <input
              type="text"
              name="lessonName"
              value={lessonName}
              onChange={(e) => handleInputChange(e, index)}
              placeholder={`Lesson Name ${index + 1}`}
              className="mt-1 block w-full p-1 border border-gray-400 rounded bg-white dark:bg-gray-600 dark:text-white"
            />
            {formData.lessonNames.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveLessonName(index)}
                className="text-red-500"
              >
                <FaTimes />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleSave}
          className="w-1/2 bg-gray-800 text-white py-1 rounded mx-auto ml-40"
        >
          Save
        </button>
      </div>

      {/* Right Side - Lesson List */}
      <div className="bg-white p-3 rounded shadow-lg dark:bg-gray-700 dark:text-white md:col-span-2">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Lesson List</h3>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          {/* Search Bar with Icon */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
              className="w-full sm:w-52 p-2 pl-10 border border-gray-400 rounded bg-white text-gray-800"
            />
            <FaSearch className="absolute top-2.5 left-2.5 text-gray-500" />
          </div>

          {/* Dropdown for Items per Page */}
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              className="p-2 border border-gray-400 rounded bg-white text-gray-800"
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              value={itemsPerPage}
            >
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={lessons.length}>All</option>
            </select>

            {/* Icons */}
            <div className="flex items-center space-x-4 text-gray-800">
              <FaCopy onClick={handleCopyToClipboard} title="Copy" className="text-xl cursor-pointer" />
              <FaPrint onClick={handlePrint} title="Print" className="text-xl cursor-pointer" />
              <FaFilePdf onClick={exportToPDF} title="Export to PDF" className="text-xl cursor-pointer" />
              <FaFileCsv onClick={exportToCSV} title="Export to CSV" className="text-xl cursor-pointer" />
              <FaFileExcel onClick={exportToExcel} title="Export to Excel" className="text-xl cursor-pointer" />
            </div>
          </div>
        </div>

        <table className="w-full border-collapse text-sm mt-4">
          <thead>
            <tr className="bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-white">
              <th className="border px-2 py-1">Class</th>
              <th className="border px-2 py-1">Section</th>
              <th className="border px-2 py-1">Subject Group</th>
              <th className="border px-2 py-1">Subject</th>
              <th className="border px-2 py-1">Lesson</th>
            </tr>
          </thead>
          <tbody>
            {currentLessons.length > 0 ? (
              currentLessons.map((lesson, index) => (
                <tr key={index} className="bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white">
                  <td className="border px-2 py-1">{lesson.class}</td>
                  <td className="border px-2 py-1">{lesson.section}</td>
                  <td className="border px-2 py-1">{lesson.subjectGroup}</td>
                  <td className="border px-2 py-1">{lesson.subject}</td>
                  <td className="border px-2 py-1">{lesson.lessonName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-2 py-1 text-center text-gray-500 dark:text-white">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lesson;
