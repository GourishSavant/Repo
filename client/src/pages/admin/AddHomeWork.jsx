import React, { useState } from "react";
import Data from "./Data";
const AddHomework = () => {
  const [showAddHomeworkPage, setShowAddHomeworkPage] = useState(false);
  const [viewUpcomingHomework, setViewUpcomingHomework] = useState(true); // Track which view to show

  const toggleAddHomeworkPage = () => {
    setShowAddHomeworkPage(!showAddHomeworkPage);
  };

  const toggleUpcomingHomework = () => {
    setViewUpcomingHomework(true);
  };

  const toggleClosedHomework = () => {
    setViewUpcomingHomework(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {!showAddHomeworkPage ? (
        <>
          {/* Select Criteria Section */}
          <div className="bg-white p-4 rounded shadow-md mb-6">
            <h2 className="text-xl font-medium mb-4 text-black">Select Criteria</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="class" className="block text-sm font-medium mb-1 text-black">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  id="class"
                  className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-blue-300 bg-white text-black"
                >
                  <option>Select</option>
                  <option>Class 1</option>
                  <option>Class 2</option>
                </select>
              </div>

              <div>
                <label htmlFor="section" className="block text-sm font-medium mb-1 text-black">
                  Section <span className="text-red-500">*</span>
                </label>
                <select
                  id="section"
                  className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-blue-300 bg-white text-black"
                >
                  <option>Select</option>
                  <option>A</option>
                  <option>B</option>
                </select>
              </div>

              <div>
                <label htmlFor="subjectGroup" className="block text-sm font-medium mb-1 text-black">
                  Subject Group <span className="text-red-500">*</span>
                </label>
                <select
                  id="subjectGroup"
                  className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-blue-300 bg-white text-black"
                >
                  <option>Select</option>
                  <option>Group 1</option>
                  <option>Group 2</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1 text-black">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-blue-300 bg-white text-black"
                >
                  <option>Select</option>
                  <option>Math</option>
                  <option>Science</option>
                </select>
              </div>
            </form>

            <div className="mt-4 flex justify-end gap-4">
              <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Search
              </button>
            </div>
          </div>

          {/* Homework List Section */}
          <div className="bg-white p-4 rounded shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-black">Homework List</h2>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={toggleAddHomeworkPage}
              >
                + Add
              </button>
            </div>

            <div className="flex gap-4 mb-4">
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                onClick={toggleUpcomingHomework}
              >
                Upcoming Homework
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                onClick={toggleClosedHomework}
              >
                Closed Homework
              </button>
            </div>

            {/* Displaying either Upcoming Homework or Closed Homework */}
            {viewUpcomingHomework ? (
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200 text-black">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Class</th>
                      <th className="border border-gray-300 px-4 py-2">Section</th>
                      <th className="border border-gray-300 px-4 py-2">Subject Group</th>
                      <th className="border border-gray-300 px-4 py-2">Subject</th>
                      <th className="border border-gray-300 px-4 py-2">Homework Date</th>
                      <th className="border border-gray-300 px-4 py-2">Submission Date</th>
                      <th className="border border-gray-300 px-4 py-2">Evaluation Date</th>
                      <th className="border border-gray-300 px-4 py-2">Created By</th>
                      <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="9" className="text-center py-4">
                        No data available in table
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200 text-black">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">
                        <input type="checkbox" className="mr-2" /> Select All
                      </th>
                      <th className="border border-gray-300 px-4 py-2">Class</th>
                      <th className="border border-gray-300 px-4 py-2">Section</th>
                      <th className="border border-gray-300 px-4 py-2">Subject Group</th>
                      <th className="border border-gray-300 px-4 py-2">Subject</th>
                      <th className="border border-gray-300 px-4 py-2">Homework Date</th>
                      <th className="border border-gray-300 px-4 py-2">Submission Date</th>
                      <th className="border border-gray-300 px-4 py-2">Evaluation Date</th>
                      <th className="border border-gray-300 px-4 py-2">Created By</th>
                      <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="10" className="text-center py-4">
                        No data available in table
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-medium mb-4 text-black">Add Homework</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="addClass" className="block text-sm font-medium mb-1 text-black">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                id="addClass"
                className="w-full border border-gray-300 rounded p-2 bg-white text-black"
              >
                <option>Select</option>
                <option>Class 1</option>
                <option>Class 2</option>
              </select>
            </div>

            <div>
              <label htmlFor="addSection" className="block text-sm font-medium mb-1 text-black">
                Section <span className="text-red-500">*</span>
              </label>
              <select
                id="addSection"
                className="w-full border border-gray-300 rounded p-2 bg-white text-black"
              >
                <option>Select</option>
                <option>A</option>
                <option>B</option>
              </select>
            </div>

            <div>
              <label htmlFor="addSubjectGroup" className="block text-sm font-medium mb-1 text-black">
                Subject Group <span className="text-red-500">*</span>
              </label>
              <select
                id="addSubjectGroup"
                className="w-full border border-gray-300 rounded p-2 bg-white text-black"
              >
                <option>Select</option>
                <option>Group 1</option>
                <option>Group 2</option>
              </select>
            </div>

            <div>
              <label htmlFor="addSubject" className="block text-sm font-medium mb-1 text-black">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                id="addSubject"
                className="w-full border border-gray-300 rounded p-2 bg-white text-black"
              >
                <option>Select</option>
                <option>Math</option>
                <option>Science</option>
              </select>
            </div>

            <div>
              <label htmlFor="homeworkDate" className="block text-sm font-medium mb-1 text-black">
                Homework Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="homeworkDate"
                className="w-full border border-gray-300 rounded p-2 bg-white text-black"
              />
            </div>

            <div>
              <label htmlFor="submissionDate" className="block text-sm font-medium mb-1 text-black">
                Submission Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="submissionDate"
                className="w-full border border-gray-300 rounded p-2 bg-white text-black"
              />
            </div>

            <div>
              <label htmlFor="maxMarks" className="block text-sm font-medium mb-1 text-black">
                Max Marks
              </label>
              <input
                type="text"
                id="maxMarks"
                className="w-full border border-gray-300 rounded p-2 bg-white text-black"
              />
            </div>

            {/* Updated File Attachment */}
            <div>
              <label htmlFor="attachDocument" className="block text-sm font-medium mb-1 text-black">
                Attach Document
              </label>
              <div className="border border-gray-300 rounded p-4 text-center bg-white text-black hover:border-blue-500 hover:bg-gray-50 cursor-pointer">
                <p>Drag and drop a file here or click</p>
              </div>
              <input type="file" id="attachDocument" className="hidden" />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1 text-black">
                Description <span className="text-red-500">*</span>
              </label>
              <Data/>
              <textarea
                id="description"
                className="w-full border border-gray-300 rounded p-2 bg-white text-black"
                rows="4"
              ></textarea>
            </div>
          </form>

          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
              onClick={toggleAddHomeworkPage}
            >
              Back
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddHomework;
