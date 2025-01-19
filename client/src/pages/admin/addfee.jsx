import React from "react";
import { useNavigate } from "react-router-dom";


const StudentFeesPage = () => {
    const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/admin/student-details"); // Update this path based on your routing structure
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Student Fees</h1>
          <button
            onClick={handleBackClick}
            className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            <span className="mr-2">🔙</span> Back
          </button>
        </div>

        {/* Student Info Section */}
        <div className="flex gap-6 mb-6">
          {/* Profile Image */}
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-5xl text-gray-400">👤</span>
          </div>
          {/* Student Details */}
          <div className="flex flex-col justify-between w-full">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="font-semibold text-gray-600">Name</p>
                <p className="text-gray-800">Gaja</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Class (Section)</p>
                <p className="text-gray-800">Class 8 (Section A)</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Admission No</p>
                <p className="text-gray-800">1234</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Roll Number</p>
                <p className="text-gray-800">-</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Father Name</p>
                <p className="text-gray-800">-</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Mobile Number</p>
                <p className="text-gray-800">-</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Category</p>
                <p className="text-red-600 font-bold">No</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
            <span className="mr-2">🖨</span> Print Selected
          </button>
          <button className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400">
            <span className="mr-2">💰</span> Collect Selected
          </button>
        </div>

        {/* Fees Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Fees Group</th>
                <th className="px-4 py-2 text-left text-gray-600">Fees Code</th>
                <th className="px-4 py-2 text-left text-gray-600">Due Date</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                <th className="px-4 py-2 text-right text-gray-600">
                  Amount ($)
                </th>
                <th className="px-4 py-2 text-left text-gray-600">Payment ID</th>
                <th className="px-4 py-2 text-left text-gray-600">Mode</th>
                <th className="px-4 py-2 text-left text-gray-600">Date</th>
                <th className="px-4 py-2 text-right text-gray-600">
                  Discount ($)
                </th>
                <th className="px-4 py-2 text-right text-gray-600">Fine ($)</th>
                <th className="px-4 py-2 text-right text-gray-600">Paid ($)</th>
                <th className="px-4 py-2 text-right text-gray-600">
                  Balance ($)
                </th>
                <th className="px-4 py-2 text-center text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2 text-right">$0.00</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2 text-right">$0.00</td>
                <td className="px-4 py-2 text-right">$0.00</td>
                <td className="px-4 py-2 text-right">$0.00</td>
                <td className="px-4 py-2 text-right">$0.00</td>
                <td className="px-4 py-2 text-center">
                  <button className="text-blue-600 hover:underline">
                    Action
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <td className="px-4 py-2 font-bold" colSpan="4">
                  Grand Total
                </td>
                <td className="px-4 py-2 text-right text-red-600 font-bold">
                  $0.00
                </td>
                <td colSpan="4"></td>
                <td className="px-4 py-2 text-right font-bold">$0.00</td>
                <td className="px-4 py-2 text-right font-bold">$0.00</td>
                <td className="px-4 py-2 text-right font-bold">$0.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentFeesPage;
