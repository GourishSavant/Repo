import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaChevronDown,
  FaChevronUp,
  FaPen,
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaBook,
  FaClipboardCheck,
} from "react-icons/fa";
const StudentSidebar = ({ isOpen }) => {
  const [isHovered, setIsHovered] = useState(false); // Sidebar hover state
  const [isEditingSession, setIsEditingSession] = useState(false); // Session edit toggle
  const [currentSession, setCurrentSession] = useState("2023-24"); // Current session
  const [dropdowns, setDropdowns] = useState({
    downloadCenter: false,
    examination: false,
    library: false,
  }); // Dropdown states
  const sessionOptions = ["2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24"]; // Session options
  const iconClasses = "text-lg";
  // Handlers
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleSaveSession = (event) => {
    setCurrentSession(event.target.value);
    setIsEditingSession(false);
  };
  const toggleDropdown = (name) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  return (
    <div
      className={`bg-gray-600 text-white transition-all duration-300 h-screen dark:bg-slate-700 ${
        isOpen || isHovered ? "w-60" : "w-16"
      } fixed top-0 left-0 z-30 overflow-y-auto`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sidebar Content */}
      <ul className="space-y-1 p-3">
        {/* Current Session */}
        <li className="flex items-center space-x-4 mb-4">
          {isEditingSession ? (
            <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-md">
              <select
                value={currentSession}
                onChange={handleSaveSession}
                className="text-sm text-gray-800 border border-gray-500 rounded p-1 bg-gray-600"
              >
                {sessionOptions.map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <span className="text-sm text-white">
              {isOpen || isHovered ? `Current Session: ${currentSession}` : currentSession}
            </span>
          )}
          {(isOpen || isHovered) && (
            <FaPen
              onClick={() => setIsEditingSession(!isEditingSession)}
              className={`${iconClasses} text-yellow-400 cursor-pointer`}
            />
          )}
        </li>
        {/* Static Links */}
        {[
          { name: "Dashboard", icon: <FaHome />, path: "/studentdashboard" },
          { name: "My Profile", icon: <FaUser />, path: "/studentprofile" },
          { name: "Fee", icon: <FaBook />, path: "/studentFee" },
          { name: "Class Timetable", icon: <FaCalendarAlt />, path: "/classtimetable" },
          { name: "Lesson Plan", icon: <FaBook />, path: "/lessonplan" },
          { name: "Online Exam", icon: <FaBook />, path: "/studentonlineexam" },
          { name: "Attendance", icon: <FaClipboardCheck />, path: "/studentattendance" },
          { name: "Syllabus Status", icon: <FaClipboardCheck />, path: "/syllabusstatus" },
          { name: "Homework", icon: <FaClipboardList />, path: "/studenthomework" },
          { name: "Apply Leave", icon: <FaCalendarAlt />, path: "/applyleave" },
          { name: "Notice Board", icon: <FaUser />, path: "/studentnoticeboard" },
          { name: "Visitor Book", icon: <FaUser />, path: "/visitorbook" },
          { name: "Teacher Review", icon: <FaUser />, path: "/teacherreview" },
        ].map(({ name, icon, path }) => (
          <li key={name}>
            <Link
              to={path}
              className="flex items-center space-x-2 p-2 text-sm rounded hover:bg-gray-700"
            >
              {icon}
              {(isOpen || isHovered) && <span>{name}</span>}
            </Link>
          </li>
        ))}
{/* Dropdowns */}
        {[
          {
            name: "Download Center",
            icon: <FaClipboardList />,
            dropdownName: "downloadCenter",
            subItems: [
              { name: "Contents", path: "/contentslist" },
              { name: "Video Tutorial", path: "" },
            ],
          },
          {
            name: "Examination",
            icon: <FaCalendarAlt />,
            dropdownName: "examination",
            subItems: [
              { name: "Exam Schedule", path: "/examschedule" },
              { name: "Exam Result", path: "" },
            ],
          },
          {
            name: "Library",
            icon: <FaBook />,
            dropdownName: "library",
            subItems: [
              { name: "Book", path: "/bookpage" },
              { name: "Book Issued", path: "/bookissued" },
            ],
          },
        ].map(({ name, icon, dropdownName, subItems }) => (
          <li key={name}>
            <button
              onClick={() => toggleDropdown(dropdownName)}
              className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
            >
              <div className="flex items-center space-x-2">
                {icon}
                {(isOpen || isHovered) && <span className="font-medium text-sm">{name}</span>}
              </div>
              {(isOpen || isHovered) &&
                (dropdowns[dropdownName] ? <FaChevronUp /> : <FaChevronDown />)}
            </button>
            {dropdowns[dropdownName] && (
              <ul className="ml-8 mt-1 space-y-1">
                {subItems.map(({ name, path }) => (
                  <li key={name}>
                    <Link
                      to={path}
                      className="block p-2 text-sm rounded hover:bg-gray-700"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default StudentSidebar;