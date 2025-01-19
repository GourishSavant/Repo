

import React, { useState } from 'react';
import  { FaEye }from "react-icons/fa";

const FinanceReport = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [viewDetails, setViewDetails] = useState(false); // State to manage "View Details" modal visibility
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const dailyCollectionData = [
    { date: '01/04/2025', totalTransactions: 0, amount: '$0.00' },
    { date: '01/05/2025', totalTransactions: 0, amount: '$0.00' },
    { date: '01/06/2025', totalTransactions: 0, amount: '$0.00' },
  ];
  // Dummy data for Class, Section, and Students
  const classOptions = ['Class 8', 'Class 9', 'Class 10'];
  const sectionOptions = ['Section A', 'Section B'];
  const studentOptions = ['Gaja (1234)', 'Ravi (5678)', 'Priya (9101)'];
  const handleClassChange = (e) => setSelectedClass(e.target.value);
  const handleSectionChange = (e) => setSelectedSection(e.target.value);
  const handleStudentChange = (e) => setSelectedStudent(e.target.value);
   // Handle search button click
   const handleSearchClick = () => {
    setIsSearchClicked(true);
  };



  // Render content based on the selected report
  const renderReportContent = () => {
    switch (selectedReport) {
      case 'Balance Fees Statement':
        return (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Class Selection */}
              <div>
                <label htmlFor="class" className="block text-gray-700 mb-2">Class</label>
                <select
                  id="class"
                  name="class"
                  className="block  w-1/2 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Class 8">Class 8</option>
                  {/* Add other classes if needed */}
                </select>
              </div>

              {/* Section Selection */}
              <div>
                <label htmlFor="section" className="block text-gray-700 mb-2">Section</label>
                <select
                  id="section"
                  name="section"
                  className="block w-1/2 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Section A">Section A</option>
                  {/* Add other sections if needed */}
                </select>
              </div>
            </div>

            {/* Balance Fees Statement Table */}
            <h2 className="text-xl font-semibold mb-4">Balance Fees Statement</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-md">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Class</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Section</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Balance Fees</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Class 8</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Section A</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">No Record Found</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
        case 'Daily Collection Report':
          return (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
  
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Date From Selection */}
                <div>
                  <label htmlFor="dateFrom" className="block text-gray-700 mb-2">Date From <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    id="dateFrom"
                    name="dateFrom"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
  
                {/* Date To Selection */}
                <div>
                  <label htmlFor="dateTo" className="block text-gray-700 mb-2">Date To <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    id="dateTo"
                    name="dateTo"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
  
              {/* Daily Collection Report Table */}
              <h2 className="text-xl font-semibold mb-4">Daily Collection Report</h2>
              <div className="overflow-x-auto bg-white shadow-md rounded-md">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Total Transactions</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Amount</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyCollectionData.map((entry, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2 text-sm">{entry.date}</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">{entry.totalTransactions}</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">{entry.amount}</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">
                          {/* Eye icon to trigger modal */}
                          <button
                            onClick={() => setViewDetails(true)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FaEye className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3" className="text-right border border-gray-300 px-4 py-2 text-sm font-semibold">Total Amount</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm font-semibold">$0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
              {/* Modal for View Details */}
              {viewDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                    <h3 className="text-xl font-semibold mb-4">Collection List</h3>
                    <div className="mb-4">
                      <p>No Record Found</p>
                    </div>
  
                    {/* Close modal */}
                    <button
                      onClick={() => setViewDetails(false)}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
  
          
          case 'Fees Statement':
            return (
              <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
          
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* Class Selection */}
                  <div>
                    <label htmlFor="class" className="block text-gray-700 mb-2">
                      Class <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="class"
                      value={selectedClass}
                      onChange={handleClassChange}
                      className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Class</option>
                      {classOptions.map((classOption, index) => (
                        <option key={index} value={classOption}>
                          {classOption}
                        </option>
                      ))}
                    </select>
                  </div>
          
                  {/* Section Selection */}
                  <div>
                    <label htmlFor="section" className="block text-gray-700 mb-2">
                      Section <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="section"
                      value={selectedSection}
                      onChange={handleSectionChange}
                      className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Section</option>
                      {sectionOptions.map((sectionOption, index) => (
                        <option key={index} value={sectionOption}>
                          {sectionOption}
                        </option>
                      ))}
                    </select>
                  </div>
          
                  {/* Student Selection */}
                  <div>
                    <label htmlFor="student" className="block text-gray-700 mb-2">
                      Student <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="student"
                      value={selectedStudent}
                      onChange={handleStudentChange}
                      className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Student</option>
                      {studentOptions.map((studentOption, index) => (
                        <option key={index} value={studentOption}>
                          {studentOption}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
          
                {/* Search Button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleSearchClick} // This will trigger the search function (you need to define handleSearchClick)
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Search
                  </button>
                </div>
          
                {/* Fees Statement */}
                <h2 className="text-xl font-semibold mb-4">Fees Statement</h2>
                <div className="bg-white shadow-md rounded-md">
                  {/* Content for the fees statement will go here */}
                </div>
              </div>
            );
            

            case 'Balance Fees Report':
              return (
                <div className="bg-white p-6 rounded shadow">
                  <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
            
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {/* Class Selection */}
                    <div>
                      <label htmlFor="class" className="block text-gray-700 mb-2">
                        Class <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="class"
                        value={selectedClass}
                        onChange={handleClassChange}
                        className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Class</option>
                        {classOptions.map((classOption, index) => (
                          <option key={index} value={classOption}>
                            {classOption}
                          </option>
                        ))}
                      </select>
                    </div>
            
                    {/* Section Selection */}
                    <div>
                      <label htmlFor="section" className="block text-gray-700 mb-2">
                        Section <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="section"
                        value={selectedSection}
                        onChange={handleSectionChange}
                        className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Section</option>
                        {sectionOptions.map((sectionOption, index) => (
                          <option key={index} value={sectionOption}>
                            {sectionOption}
                          </option>
                        ))}
                      </select>
                    </div>
            
                    {/* Search Type Selection */}
                    <div>
                      <label htmlFor="searchType" className="block text-gray-700 mb-2">
                        Search Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="searchType"
                        value={selectedSearchType}
                        onChange={handleSearchTypeChange}
                        className="block w-full border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="all">All</option>
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                        {/* Add more search types as needed */}
                      </select>
                    </div>
                  </div>
            
                  {/* Search Button */}
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={handleSearchClick} // Define the search logic here
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Search
                    </button>
                  </div>
            
                  {/* Display Balance Fees Report (you can render this dynamically as needed) */}
                  <h2 className="text-xl font-semibold mb-4">Balance Fees Report</h2>
                  <div className="bg-white shadow-md rounded-md">
                    {/* Report content will go here */}
                  </div>
                </div>
              );
            
      case 'Fees Collection Report':
        return <div>Fees Collection Report Content</div>;
      case 'Online Fees Collection Report':
        return <div>Online Fees Collection Report Content</div>;
      case 'Balance Fees Report With Remark':
        return <div>Balance Fees Report With Remark Content</div>;
      case 'Income Report':
        return <div>Income Report Content</div>;
      case 'Expense Report':
        return <div>Expense Report Content</div>;
      case 'Payroll Report':
        return <div>Payroll Report Content</div>;
      case 'Income Group Report':
        return <div>Income Group Report Content</div>;
      case 'Expense Group Report':
        return <div>Expense Group Report Content</div>;
      case 'Online Admission Fees Collection Report':
        return <div>Online Admission Fees Collection Report Content</div>;
      default:
        return <div>Select a report to view details.</div>;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Finance Reports</h1>

      <div className="bg-white p-4 rounded shadow mb-6">

        <div className="flex flex-wrap gap-4">
          {[
            'Balance Fees Statement',
            'Daily Collection Report',
            'Fees Statement',
            'Balance Fees Report',
            'Fees Collection Report',
            'Online Fees Collection Report',
            'Balance Fees Report With Remark',
            'Income Report',
            'Expense Report',
            'Payroll Report',
            'Income Group Report',
            'Expense Group Report',
            'Online Admission Fees Collection Report',
          ].map((report) => (
            <button
              key={report}
              onClick={() => setSelectedReport(report)}
              className={`px-4 py-2 rounded border transition-colors duration-300 ${
                selectedReport === report
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {report}
            </button>
          ))}
        </div>
      </div>

      {/* Display selected report content */}
      <div className="bg-white p-6 rounded shadow">
        {renderReportContent()}
      </div>
    </div>
  );
};

export default FinanceReport;
