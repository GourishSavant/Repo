// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaPen } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faList, faThList } from '@fortawesome/free-solid-svg-icons';
// import axiosApi from "../../api/axiosApi.jsx";

// const StaffManagement = () => {
//   const [role, setRole] = useState('');
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [viewMode, setViewMode] = useState('card');
//   const [staffData, setStaffData] = useState([]);
//   const [loading, setLoading] = useState(true); // For loading state
//   const navigate = useNavigate();

//  useEffect(() => {
//   const fetchStaffData = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosApi.get('/auth/getAllStaff'); // API endpoint
//       setStaffData(response.data); // Set fetched data to state
//       console.log('Fetched Staff Data:', response.data); // Debugging
//     } catch (error) {
//       console.error('Error fetching staff data:', error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };


//   fetchStaffData();
// }, []);
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchStaff } from '../../redux/slices/stafffSlice.jsx'; // Import the async thunk
import { FaEye, FaPen } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from "react-router-dom";
import { faList, faThList } from '@fortawesome/free-solid-svg-icons';
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import { useParams } from 'react-router-dom'; // Import useParams hook
import { useLocation } from "react-router-dom";
import  fetchCategoryPermission  from '../../redux/slices/permissionSlice';
import axiosApi from '../../api/axiosApi.jsx';
const StaffManagement = () => {
  const [role, setRole] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [viewMode, setViewMode] = useState('card');
  const { category_name } = useParams(); // Get role_id and category_name from URL params
  const [canAdd, setCanAdd] = useState(0);
  const [canView, setCanView] = useState(0);
   
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: staffData, loading } = useSelector((state) => state.staff);
  const location = useLocation();
  const submenuId = new URLSearchParams(location.search).get("submenu_id");
  // const { canAdd, loading: permissionLoading } = useSelector((state) => state.permissions);
  const auth = useSelector((state) => state.auth);

console.log(submenuId);
const role_id = localStorage.getItem("role_id"); 
console.log(role_id);

const currentUserEmpId = auth.staff.staff_id;
  const catgry_name = "Can see other users profile";
  // useEffect(() => {
  //   dispatch(fetchStaff());
  // }, [dispatch]);
  useEffect(() => {
    dispatch(fetchStaff());
    if (auth?.role) {
      setRole(auth.role);
  }
  }, [dispatch, auth.role]);

  useEffect(() => {
    // Fetch the canAdd permission based on role_id and category_name
    fetchPermission(role_id, submenuId);
  }, [role_id, submenuId]); // Re-run when role_id or category_name changes

  useEffect(() => {
    // Fetch the canAdd permission based on role_id and category_name
    fetchProfileViewPermission(role_id, catgry_name);
  }, [role_id, catgry_name]); // Re-run when role_id or category_name changes

  console.log(role,"i am role")
  const fetchPermission = async (role_id, submenuId) => {
    // Example API call to get canAdd permission
    try {
   
      // category_name = "staff";
      const response = await axiosApi.get(`/auth/permission-category/${submenuId}/id/${role_id}`);
      console.log(role_id ,"hhhh")
      console.log(response.data.canAdd ,"kkk")
      if (response.data.success) {
        setCanAdd(response.data.canAdd); // Set the canAdd permission from the response
      } else {
        setCanAdd(0); // Default to 0 if no permission is found
      }
    } catch (error) {
      console.error('Error fetching permission:', error);
      setCanAdd(0); // Default to 0 on error
    }
  };


  const fetchProfileViewPermission = async (role_id, catgry_name) => {
    // Example API call to get canAdd permission
    try {
   
      // category_name = "staff";
      const response = await axiosApi.get(`/auth/getCanViewforOthers/${catgry_name}/id/${role_id}`);
      console.log(response.data.canView ,"canView")
      if (response.data.success) {
        setCanView(response.data.canView); // Set the canView permission from the response
      } else {
        setCanView(0); // Default to 0 if no permission is found
      }
    } catch (error) {
      console.error('Error fetching permission:', error);
      setCanView(0); // Default to 0 on error
    }
  };


 
  // //Fetch category permission (canAdd)
  // useEffect(() => {
  //   dispatch(fetchCategoryPermission({ role_id, name: category_name }));
  // }, [dispatch, role_id, category_name]);


  const filteredStaff = staffData.filter(
    (staff) =>
      (!role || staff.role === role) &&
      (!searchKeyword ||
        staff.staff_id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        staff.first_name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        staff.last_name.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
   
      <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-md">
        <h1 className="text-2xl font-bold mb-6">Staff Management</h1>

        <div className="flex justify-between items-center mb-4">
          {/* Filters */}
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Role *</label>
              <select
                className="w-40 border rounded px-3 py-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Search By Keyword</label>
              <input
                type="text"
                className="w-40 border rounded px-3 py-2"
                placeholder="Search by Staff ID, Name, Role"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 mt-5">
            <button
              type="button"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition"
            >
              Search
            </button>
            
          </div>
          </div>

          {/* Search and Add Staff */}
          <div className="flex items-center gap-4">
           
            {/* <button 
              type="button"
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition"
              onClick={() => navigate('/admin/staff/create')} // Navigate to create staff page
            >
              + Add Staff
            </button> */}
          </div>
          {canAdd === 1 && (
  <button
    type="button"
    className="px-6 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition"
    onClick={() => navigate("/admin/staff/create")}
  >
    + Add Staff
  </button>
)}

{/*           
                    <div className="flex items-center gap-4">
            {can_add === 1 && ( // Check if can_add permission is 1
              <button
                type="button"
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition"
                onClick={() => navigate('/admin/staff/create')} // Navigate to create staff page
              >
                + Add Staff
              </button>
            )}
          </div> */}

        </div>

      {/* Tabs with Font Awesome Icons */}
<div className="flex space-x-4 mb-6">
  <button
    className={`px-4 py-2 flex items-center ${viewMode === 'card' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-600 dark:text-white'}`}
    onClick={() => setViewMode('card')}
  >
    <FontAwesomeIcon icon={faThList} className="mr-2" /> Card View
  </button>
  <button
    className={`px-4 py-2 flex items-center ${viewMode === 'list' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-600 dark:text-white'}`}
    onClick={() => setViewMode('list')}
  >
    <FontAwesomeIcon icon={faList} className="mr-2" /> List View
  </button>
</div>

{/* Display Staff */}
{/* Display Staff */}
<div>
  {viewMode === 'card' ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {staffData.map((staff) => (
        <div key={staff.id} className="bg-white border rounded shadow p-4 relative group hover:shadow-lg transition-all">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-semibold mx-auto">
            {staff.first_name.split(' ').map((word) => word[0]).join('')}
          </div>
          <h3 className="text-xl font-semibold text-center">{staff.first_name} {staff.last_name}</h3>
          <p className="text-sm text-center">Role: {staff.role_name}</p>
          <p className="text-sm text-center">Staff ID: {staff.staff_id}</p>
          <p className="text-sm text-center">Phone: {staff.phone_no}</p>

          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Show "Eye View" button if user is superadmin or it's the logged-in user's profile */}
            {(role === 'Super Admin' || staff.staff_id === currentUserEmpId || canView) && (
              <button
                className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full mx-2 hover:bg-blue-600"
                onClick={() => navigate(`/admin/staff/${staff.staff_emp_id}`)} // Navigate to profile
              >
                <FaEye />
              </button>
            )}
             {(role === 'Super Admin' || staff.staff_id === currentUserEmpId || canView) && (
            <button
              className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full mx-2 hover:bg-green-600"
              onClick={() => navigate(`/admin/staff/${staff.id}/edit`)} // Navigate to edit
            >
              <FaPen />
            </button>
             )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Staff ID</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Role</th>
            <th className="px-4 py-2 border-b">Department</th>
            <th className="px-4 py-2 border-b">Designation</th>
            <th className="px-4 py-2 border-b">Mobile Number</th>
            <th className="px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff) => (
            <tr key={staff.id}>
              <td className="px-4 py-2 border-b">{staff.staff_id}</td>
              <td className="px-4 py-2 border-b">{staff.first_name} {staff.last_name}</td>
              <td className="px-4 py-2 border-b">{staff.role}</td>
              <td className="px-4 py-2 border-b">{staff.department}</td>
              <td className="px-4 py-2 border-b">{staff.designation}</td>
              <td className="px-4 py-2 border-b">{staff.phone_no}</td>
              <td className="px-4 py-2 border-b flex gap-2">
                {/* Show "Eye View" button if user is superadmin or it's the logged-in user's profile */}
                {(role === 'Super Admin' || staff.staff_id === currentUserEmpId || canView) && (
                  <button
                    className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    onClick={() => navigate(`/admin/staff/${staff.staff_emp_id}`)} // Navigate to profile
                  >
                    <FaEye />
                  </button>
                )}
                 {(role === 'Super Admin' || staff.staff_id === currentUserEmpId || canView) && (
                <button
                  className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600"
                  onClick={() => navigate(`/admin/staff/${staff.id}/edit`)} // Navigate to edit
                >
                  <FaPen />
                </button>
                 )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
</div>
</div>
    
  );
};

export default StaffManagement;
