import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import AdminPanel from './Dashboard';
import StudentPanel from '../students/StudentDashboard'

const StudentData= () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve role from localStorage
    // const staff = JSON.parse(localStorage.getItem(role_id));
    // if(staff==1){
      setRole("student");
    // }
    // if (staff && staff.role) {
    //   setRole(staff.role);
    // } else {
    //   // Redirect to login if no role is found
    //   navigate('/');
    // }
  }, [navigate]);

  if (!role) {
    return <p>Loading...</p>;
  }
  console.log(role)
  // Render the panel based on the role
  switch (role) {
    // case 'Super Admin':
    // case 'Admin':
    //   return <AdminPanel />;
    case 'student':
      return <StudentPanel />;
    case 'Teacher':
      return <TeacherPanel />;
    case 'parent':
      return <ParentPanel />;
    default:
      return <div>Unknown role. Please contact support.</div>;
  }
};

//const AdminPanel = () => <h2>Admin Dashboard</h2>;
// const StudentPanel = () => <h2>Student Dashboard</h2>;
const TeacherPanel = () => <h2>Teacher Dashboard</h2>;
const ParentPanel = () => <h2>Parent Dashboard</h2>;

export default StudentData;
