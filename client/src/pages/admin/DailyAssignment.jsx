import React, { useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa"; // Import React Icons

const DailyAssignment = () => {
  const [assignments, setAssignments] = useState([]); // State for assignment data
  const [criteria, setCriteria] = useState({
    class: "",
    section: "",
    subjectGroup: "",
    subject: "",
    date: "",
  });

  const handleCriteriaChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchAssignments = () => {
    // Simulate fetching filtered data based on criteria
    const sampleData = [
      {
        studentName: "John Doe",
        class: criteria.class || "Class 1",
        section: criteria.section || "A",
        subject: criteria.subject || "Math",
        title: "Algebra Practice",
        submissionDate: "2025-01-06",
        evaluationDate: "2025-01-07",
        evaluatedBy: "Mr. Smith",
      },
      {
        studentName: "Jane Smith",
        class: criteria.class || "Class 1",
        section: criteria.section || "A",
        subject: criteria.subject || "Science",
        title: "Science Experiment",
        submissionDate: "2025-01-06",
        evaluationDate: "2025-01-07",
        evaluatedBy: "Ms. Johnson",
      },
    ];
    setAssignments(sampleData);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Select Criteria Section */}
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-xl font-medium mb-4 text-black">Select Criteria</h2>
        <div className="grid grid-cols-5 gap-6 mb-4">
          {/* Class Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="class" className="block text-sm font-medium mb-1 text-black">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              id="class"
              name="class"
              value={criteria.class}
              onChange={handleCriteriaChange}
              className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-blue-300 bg-white text-black"
            >
              <option value="">Select</option>
              <option>Class 1</option>
              <option>Class 2</option>
            </select>
          </div>

          {/* Section Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="section" className="block text-sm font-medium mb-1 text-black">
              Section <span className="text-red-500">*</span>
            </label>
            <select
              id="section"
              name="section"
              value={criteria.section}
              onChange={handleCriteriaChange}
              className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-blue-300 bg-white text-black"
            >
              <option value="">Select</option>
              <option>A</option>
              <option>B</option>
            </select>
          </div>

          {/* Subject Group Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="subjectGroup" className="block text-sm font-medium mb-1 text-black">
              Subject Group <span className="text-red-500">*</span>
            </label>
            <select
              id="subjectGroup"
              name="subjectGroup"
              value={criteria.subjectGroup}
              onChange={handleCriteriaChange}
              className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-blue-300 bg-white text-black"
            >
              <option value="">Select</option>
              <option>Group 1</option>
              <option>Group 2</option>
            </select>
          </div>

          {/* Subject Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="subject" className="block text-sm font-medium mb-1 text-black">
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              value={criteria.subject}
              onChange={handleCriteriaChange}
              className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-blue-300 bg-white text-black"
            >
              <option value="">Select</option>
              <option>Math</option>
              <option>Science</option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col">
            <label htmlFor="date" className="block text-sm font-medium mb-1 text-black">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={criteria.date}
              onChange={handleCriteriaChange}
              className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-blue-300 bg-white text-black"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={fetchAssignments}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* Daily Assignment List Heading */}
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-4 text-black">Daily Assignment List</h2>
      </div>

      {/* Daily Assignment List Section */}
      <div className="bg-white p-4 rounded shadow-md">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-black">Student Name</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Class</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Section</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Subject</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Submission Date</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Evaluation Date</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Evaluated By</th>
                <th className="border border-gray-300 px-4 py-2 text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length > 0 ? (
                assignments.map((assignment, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 text-black">{assignment.studentName}</td>
                    <td className="border border-gray-300 px-4 py-2 text-black">{assignment.class}</td>
                    <td className="border border-gray-300 px-4 py-2 text-black">{assignment.section}</td>
                    <td className="border border-gray-300 px-4 py-2 text-black">{assignment.subject}</td>
                    <td className="border border-gray-300 px-4 py-2 text-black">{assignment.title}</td>
                    <td className="border border-gray-300 px-4 py-2 text-black">{assignment.submissionDate}</td>
                    <td className="border border-gray-300 px-4 py-2 text-black">{assignment.evaluationDate}</td>
                    <td className="border border-gray-300 px-4 py-2 text-black">{assignment.evaluatedBy}</td>
                    <td className="border border-gray-300 px-4 py-2 text-black flex space-x-3 justify-center">
                      {/* Edit Icon */}
                      <FaEdit className="text-gray-500 cursor-pointer hover:text-blue-500" />
                      {/* Cross Mark Icon */}
                      <FaTimes className="text-gray-500 cursor-pointer hover:text-red-500" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="border border-gray-300 px-4 py-2 text-center text-black">
                    No assignments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DailyAssignment;
