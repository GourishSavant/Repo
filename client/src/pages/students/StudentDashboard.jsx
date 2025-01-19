import { FaChartLine, FaRegClipboard, FaCalendarAlt } from "react-icons/fa";
import StudentNavbar from "../../components/admin/studentnavbar";
import StudentSidebar from "../../components/admin/studentsidebar";
// import StudentLayout from "../../components/admin/studentLayout";
const StudentDashboard = () => {
  return (
    <div className="flex-grow">
      {/* Welcome Section */}
      <StudentNavbar/>
    <StudentSidebar/>
    {/* <StudentLayout/> */}
      <div className="bg-white shadow p-4 rounded mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-gray-300 h-16 w-16 rounded-full"></div>
          <h2 className="text-xl font-bold">Welcome, Tejashvini!</h2>
        </div>
        <div className="bg-gray-200 p-2 rounded text-gray-600">
          Notice Board: <span className="font-bold">qwert</span> (12/06/2024)
        </div>
      </div>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FaChartLine /> Subject Progress
          </h3>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FaCalendarAlt /> Upcoming Class
          </h3>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FaRegClipboard /> Homework
          </h3>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
      {/* Teacher List, Visitor List, and Library Book Issue List */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Teacher List */}
        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-lg font-bold mb-4">Teacher List</h3>
        </div>
        {/* Visitor List */}
        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-lg font-bold mb-4">Visitor List</h3>
        </div>
        {/* Library Book Issue List */}
        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-lg font-bold mb-4">Library Book Issue List</h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Book No.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Book Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Issue Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Due Return</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default StudentDashboard;