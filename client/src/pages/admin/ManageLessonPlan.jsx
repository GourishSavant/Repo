import React, { useState } from "react";

const ManageLessonPlan = ({ isDarkMode }) => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [isDataVisible, setIsDataVisible] = useState(false);

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
  };

  const handleSearch = () => {
    if (selectedTeacher) {
      generateSchedule();
      setIsDataVisible(true);
    } else {
      alert("Please select a teacher to view the schedule.");
    }
  };

  const generateSchedule = () => {
    const days = [
      { day: "Monday", date: "12/23/2024", status: "Not Scheduled" },
      { day: "Tuesday", date: "12/24/2024", status: "Not Scheduled" },
      { day: "Wednesday", date: "12/25/2024", status: "Not Scheduled" },
      { day: "Thursday", date: "12/26/2024", status: "Not Scheduled" },
      { day: "Friday", date: "12/27/2024", status: "Not Scheduled" },
      { day: "Saturday", date: "12/28/2024", status: "Not Scheduled" },
      { day: "Sunday", date: "12/29/2024", status: "Not Scheduled" },
    ];

    setSchedule(days);
  };

  return (
    <div
      className={`container mx-auto p-6 transition duration-300 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="p-6 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6">Manage Lesson Plan</h1>

        {/* Teacher Selection */}
        <div className="mb-6">
          <label
            htmlFor="teachers"
            className="block text-lg font-semibold mb-2"
          >
            Teachers <span className="text-red-500">*</span>
          </label>
          <select
            id="teachers"
            className="p-2 w-full sm:w-1/2 border rounded-md bg-gray-100 text-black border-gray-300"
            value={selectedTeacher}
            onChange={handleTeacherChange}
          >
            <option value="">Select</option>
            <option value="Mayur Patel">Mayur Patel</option>
            <option value="Jane Smith">Jane Smith</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Search
        </button>
      </div>

      {/* Horizontal Schedule Display */}
      {isDataVisible && schedule.length > 0 && (
        <div className="mt-6 flex gap-4 overflow-x-auto">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded shadow min-w-[150px] bg-gray-100 text-center"
            >
              <div className="font-bold text-lg mb-2">{item.day}</div>
              <div className="text-sm mb-2">{item.date}</div>
              <div className="flex items-center justify-center text-red-500 text-sm">
                <span className="mr-1">❌</span> {item.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageLessonPlan;
