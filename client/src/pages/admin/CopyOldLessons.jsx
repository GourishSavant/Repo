import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const CopyLessonPlan = () => {
  const sessions = ["2022-2023", "2023-2024"];
  const classes = ["Class 1", "Class 2", "Class 3"];
  const sections = ["A", "B", "C"];
  const subjectGroups = ["Science", "Arts"];
  const subjects = ["Math", "English", "Physics"];

  const [formData, setFormData] = useState({
    session: "",
    class: "",
    section: "",
    subjectGroup: "",
    subject: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(formData); // Mock result for demo purposes
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-black mb-4">
          Select Old Session Details
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Grid layout for form fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { label: "Session", name: "session", options: sessions },
            { label: "Class", name: "class", options: classes },
            { label: "Section", name: "section", options: sections },
            { label: "Subject Group", name: "subjectGroup", options: subjectGroups },
            { label: "Subject", name: "subject", options: subjects },
          ].map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className="block text-black font-medium mb-2">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="p-2 border border-gray-500 rounded text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select</option>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Search button below form */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="flex items-center justify-center py-2 px-6 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
          >
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="my-6">
        <hr className="border-t-2 border-gray-300" />
      </div>

      {/* Display selected details in tabular format */}
      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-black">
            Selected Details
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-500">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-500 px-4 py-2 text-left text-black">
                    Field
                  </th>
                  <th className="border border-gray-500 px-4 py-2 text-left text-black">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result).map(([key, value], index) => (
                  <tr key={index} className="bg-white hover:bg-gray-100">
                    <td className="border border-gray-500 px-4 py-2 text-black capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </td>
                    <td className="border border-gray-500 px-4 py-2 text-black">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopyLessonPlan;
