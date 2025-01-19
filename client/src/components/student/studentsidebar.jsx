
import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import UniversityName from "../../assets/admin/universityName.png";
import { useModuleContext } from "../../Context/ModuleContext.jsx"; // Correct relative path
import { useDispatch, useSelector } from "react-redux";
import {fetchPermissions} from "../common/Sidebar/EnabledFeatures.jsx"
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserAlt,
  FaCalendarAlt,
  FaUserTie,
  FaBook,
  FaUser,
  FaDollarSign,
  FaFileAlt,
  FaCalendar,
  FaClipboardList,
  FaChalkboardTeacher,
  FaAngleDoubleRight,
  FaCommentDots,
  FaRegFileAlt,
  FaDesktop,
  FaBullhorn,
  FaUserClock,
  FaCog,
  FaChevronDown,
  FaChevronUp,
  FaCogs,
  FaGraduationCap,
  FaMoneyBillWave,
  FaCertificate,
  FaComments,
  FaCloud,
  FaUsers,
  FaMoneyBill,
  FaPen,
  FaEllipsisH,
  FaLink,
  FaGripVertical,
} from "react-icons/fa";
import axios from '../../api/axiosApi.jsx'
// import { Link, useLocation } from "react-router-dom";


const StudentSidebar = ({ isOpen, toggleStudentSidebar, role_id, visibleGroups, toggleGroupVisibility })  => {
  // const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false); // State to toggle Quick Links visibility
  const [menuData, setMenuData] = useState([]);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
 
  const [currentSession, setCurrentSession] = useState("2018-19");

  const [isEditingSession, setIsEditingSession] = useState(false); // Toggle edit mode for session

  const sessionOptions = ['2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24']; // Available session years

  const iconClasses = "text-lg";
 
  // const location = useLocation();
// .........................................
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Track clicked category
  const { rolePermissions = [] } = useSelector((state) => state.permissions); // Permissions from Redux
// .....................................
 const navigate = useNavigate();
  const toggleQuickLinks = () => {
    setIsQuickLinksOpen(!isQuickLinksOpen); // Toggle Quick Links visibility
  };

  const handleSaveSession = () => {
    setCurrentSession(editedSession);
    setIsEditingSession(false); // Stop editing after saving
  };
// .............................................
  console.log("userr");
    // Check if a category has a specific permission
    const hasPermission = (categoryId, action) => {
      const permission = rolePermissions.find(
        (perm) => perm.permission_category_id === categoryId
      );
      return permission?.[action] === 1;
    };
  
    // Handle category click
    const handleCategoryClick = (category_name) => {
      console.log(category_name,"cat")
      setSelectedCategoryId(category_name);
      navigate(`/admin/${category_name}`); 
    };


    useEffect(() => {
      const fetchMenuData = async () => {
        try {
          // if (!role_id) {
          //   throw new Error("Role ID is missing in the token");
          // }
          const response = await axios.get(`/auth/perm/permissionStudentParent`);
          console.log(response ,"k")
          setMenuData(response.data.data);
        } catch (err) {
          console.error("Error fetching sidebar data:", err);
          setError("Failed to load sidebar menu.");
        }
      };
  
      fetchMenuData();
    });
  
    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

  return (
    <div
      className={`bg-gray-600 text-white transition-all duration-300 h-screen dark:bg-slate-700 ${isOpen || isHovered ? 'w-60' : 'w-16'
        } fixed top-0 left-0 h-screen z-30 overflow-y-auto`}
    >
      <ul className="space-y-1 p-3">

        {/* University Logo */}
        <li className="mb-4">
          <img
            src={UniversityName}
            alt="UniversityName"
            className={`h-15 w-auto transition-all duration-300 ${isOpen || isHovered ? 'mx-auto' : 'mx-auto'}`}
          />
        </li>
        {/* Current Session and Pen Icon */}
        <li className="flex items-center space-x-4 mb-4">
          {/* Current Session or Dropdown */}
          {isEditingSession ? (
            <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-md">
              <select
                value={currentSession}
                onChange={handleSaveSession}
                className="text-sm text-black-400 border border-gray-500 rounded p-1 bg-gray-600"
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
              onClick={() => setIsEditingSession(!isEditingSession)} // Toggle edit mode when clicking pen
              className={`${iconClasses} text-yellow-400 cursor-pointer`}
            />
          )}
        </li>

        <li>
          <Link
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
            onClick={() => document.getElementById('overlay').style.display = 'block'} // Open overlay on click
          >
            <div className="flex items-center space-x-2">
              <li className="flex items-center space-x-24 mb-2">
                <span className="text-sm text-white">{isOpen || isHovered ? 'Quick Links' : 'Links'}</span>
                {(isOpen || isHovered) && <FaGripVertical className={`${iconClasses} text-gray-400`} />}
              </li>
            </div>
          </Link>

          {/* Full-Screen Overlay */}
          <div
            id="overlay"
            className="overlay"
            style={{
              display: 'none',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
              zIndex: 999,
              overflow: 'auto', // Allow scrolling when content overflows
            }}
            onClick={() => document.getElementById('overlay').style.display = 'none'} // Close on click anywhere
          >
            {/* Overlay Content */}
            <div
              className="overlay-content bg-white p-6"
              style={{
                maxWidth: '90%', // Customize width as needed
                margin: '40px auto', // Adjust margins as needed (top, bottom, left, right)
                borderRadius: '8px',
                overflowY: 'auto', // Enable vertical scrolling if content exceeds height
                maxHeight: '80vh', // Limit height for scrollable content
                display: 'grid', // Use grid layout
                gridTemplateColumns: 'repeat(4, 1fr)', // Create a 4x4 grid layout (4 sections per row)
                gap: '20px', // Space between columns
              }}
              onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to close overlay
            >

            </div>
          </div>
        </li>

       

        <aside
  className={`sidebar bg-gray-800 text-white h-screen fixed transition-all duration-300 ${
    isOpen ? "w-56" : "w-12"
  } overflow-y-auto`}
>
  <ul>
    {Array.isArray(menuData) && menuData.length > 0 ? (
      menuData.map((menu) => (
        <li key={menu.permission_student_id} className="mb-6">
          {/* Main Menu */}
          <div
            className="px-4 py-2 flex items-center cursor-pointer bg-gray-700 rounded-md hover:bg-gray-600"
          >
            <span className={`flex-grow ${isOpen ? "" : "hidden"}`}>
              {menu.name}
            </span>
          </div>
        </li>
      ))
    ) : (
      <p className="text-center text-gray-400 mt-4">No menus available</p>
    )}
  </ul>
</aside>



      </ul>
    </div>
  );
};

export default StudentSidebar;

