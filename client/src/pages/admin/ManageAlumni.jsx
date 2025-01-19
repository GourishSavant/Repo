import React, { useState } from "react";

const ManageAlumni = () => {
  const [criteria, setCriteria] = useState({
    passOutSession: "",
    selectedClass: "",
    selectedSection: "",
    admissionNumber: "",
  });

  const [alumniData, setAlumniData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Example: Fetch alumni data from the server or filter from existing data
    const dummyData = {
      passOutSession: "2023-2024",
      class: "10th",
      section: "A",
      admissionNumber: "12345",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "9876543210",
    };

    // Matching criteria for demonstration
    if (
      criteria.passOutSession === dummyData.passOutSession &&
      criteria.selectedClass === dummyData.class &&
      criteria.selectedSection === dummyData.section &&
      criteria.admissionNumber === dummyData.admissionNumber
    ) {
      setAlumniData(dummyData);
    } else {
      setAlumniData(null);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white text-black dark:bg-gray-700 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Select Criteria</h1>
      <form onSubmit={handleSearch} className="space-y-6">
        {/* Horizontal layout for select fields and search */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Pass Out Session */}
          <div className="flex-1">
            <label htmlFor="passOutSession" className="block">
              Pass Out Session *
            </label>
            <select
              id="passOutSession"
              name="passOutSession"
              value={criteria.passOutSession}
              onChange={handleChange}
              required
              className="p-2 w-full border-2 border-gray-400 bg-white text-black dark:border-white dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
            </select>
          </div>

          {/* Class */}
          <div className="flex-1">
            <label htmlFor="selectedClass" className="block">
              Class *
            </label>
            <select
              id="selectedClass"
              name="selectedClass"
              value={criteria.selectedClass}
              onChange={handleChange}
              required
              className="p-2 w-full border-2 border-gray-400 bg-white text-black dark:border-white dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
            </select>
          </div>

          {/* Section */}
          <div className="flex-1">
            <label htmlFor="selectedSection" className="block">
              Section
            </label>
            <select
              id="selectedSection"
              name="selectedSection"
              value={criteria.selectedSection}
              onChange={handleChange}
              className="p-2 w-full border-2 border-gray-400 bg-white text-black dark:border-white dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          {/* Search by Admission Number */}
          <div className="flex-1">
            <label htmlFor="admissionNumber" className="block">
              Search by Admission Number
            </label>
            <input
              type="text"
              id="admissionNumber"
              name="admissionNumber"
              value={criteria.admissionNumber}
              onChange={handleChange}
              className="p-2 w-full border-2 border-gray-400 bg-white text-black dark:border-white dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="bg-gray-200 text-black px-4 py-2 rounded-md dark:bg-gray-200 dark:text-black"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Display Alumni Data in Tabular Format */}
      {alumniData ? (
        <div className="mt-6 p-4 rounded-lg shadow-md dark:bg-gray-500 overflow-x-auto">
          <h2 className="text-xl font-semibold text-black mb-4">Alumni Details</h2>
          <table className="table-auto w-full text-left text-black dark:text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2">Field</th>
                <th className="p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 font-semibold">Name</td>
                <td className="p-2">{alumniData.name}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Email</td>
                <td className="p-2">{alumniData.email}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Phone</td>
                <td className="p-2">{alumniData.phone}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Admission Number</td>
                <td className="p-2">{alumniData.admissionNumber}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Class</td>
                <td className="p-2">{alumniData.class}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Section</td>
                <td className="p-2">{alumniData.section}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Pass Out Session</td>
                <td className="p-2">{alumniData.passOutSession}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        criteria.admissionNumber && (
          <p className="mt-6 text-red-500">No alumni found with the given criteria.</p>
        )
      )}
    </div>
  );
};

export default ManageAlumni;
