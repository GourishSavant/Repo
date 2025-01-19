import React, { useState } from "react";

const ManageSyllabusStatus = () => {
  const [formData, setFormData] = useState({
    class: "",
    section: "",
    subjectGroup: "",
    subject: "",
  });

  const [searchResults, setSearchResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = () => {
    if (
      formData.class &&
      formData.section &&
      formData.subjectGroup &&
      formData.subject
    ) {
      setSearchResults([
        {
          class: formData.class,
          section: formData.section,
          subjectGroup: formData.subjectGroup,
          subject: formData.subject,
        },
      ]);
    } else {
      alert("Please fill all fields to search.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg">
      <h3 className="text-lg font-bold mb-4 text-black">Manage Syllabus</h3>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col w-1/5">
          <label className="text-sm font-medium text-gray-900 dark:text-white">
            Class <span className="text-red-500">*</span>
          </label>
          <select
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white dark:bg-white dark:text-black dark:border-gray-600"
          >
            <option value="">Select</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
          </select>
        </div>
        <div className="flex flex-col w-1/5">
          <label className="text-sm font-medium text-gray-900 dark:text-white">
            Section <span className="text-red-500">*</span>
          </label>
          <select
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white dark:bg-white dark:text-black dark:border-gray-600"
          >
            <option value="">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
        <div className="flex flex-col w-1/5">
          <label className="text-sm font-medium text-gray-900 dark:text-white">
            Subject Group <span className="text-red-500">*</span>
          </label>
          <select
            name="subjectGroup"
            value={formData.subjectGroup}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white dark:bg-white dark:text-black dark:border-gray-600"
          >
            <option value="">Select</option>
            <option value="Science">Science</option>
            <option value="Arts">Arts</option>
          </select>
        </div>
        <div className="flex flex-col w-1/5">
          <label className="text-sm font-medium text-gray-900 dark:text-white">
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white dark:bg-white dark:text-black dark:border-gray-600"
          >
            <option value="">Select</option>
            <option value="Math">Math</option>
            <option value="English">English</option>
          </select>
        </div>
        <div className="flex justify-end w-full">
          <button
            onClick={handleSearch}
            className="py-2 px-6 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* Result Section */}
      {searchResults && (
        <div className="mt-6 p-6 bg-gray-200 dark:bg-gray-800 border border-gray-300 rounded-md shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Search Results
          </h4>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-300 dark:bg-gray-700">
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">
                  Class
                </th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">
                  Section
                </th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">
                  Subject Group
                </th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">
                  Subject
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result, index) => (
                <tr key={index} className="border-b dark:border-gray-600">
                  <td className="px-4 py-2 text-gray-900 dark:text-white">
                    {result.class}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-white">
                    {result.section}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-white">
                    {result.subjectGroup}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-white">
                    {result.subject}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageSyllabusStatus;
