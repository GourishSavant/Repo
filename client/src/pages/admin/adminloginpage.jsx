
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosApi from "../../api/axiosApi";
// //import { useAuth } from "../../context/AuthContext";
// //import { useRole } from '../../context/RoleContext'; // Import the context hook


// const AdminLoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   //const { setRole } = useRole();
//   const [role, setRole] = useState(null); // State to store the user's role
//   // const { login } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await axiosApi.post('/auth/login', {
//         email: username,
//         password
//       });
//       console.log("Login response data:", response.data);
  
//       const { accessToken, refreshToken, staff } = response.data;
  
//       // Check if tokens are returned and handle them
//       if (accessToken && refreshToken) {
//         // Store the accessToken in localStorage
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("staff", JSON.stringify(staff));
//         setRole(staff.role); // Update the role in context
//         navigate("/admin/dashboard");
     
//       } else {
//         setError("Login failed. Invalid credentials or missing tokens.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       if (error.response) {
//         setError(error.response.data?.error || "Login failed. Please check your credentials.");
//       } else if (error.request) {
//         setError("No response from server. Please try again later.");
//       } else {
//         setError("An unexpected error occurred. Please try again.");
//       }
//     }
//   };
  
  

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" htmlFor="username">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };


// export default AdminLoginPage;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/authSlice.jsx";
import {
  fetchPermissions,
  fetchRolePermissions,
} from "../../redux/slices/permissionSlice.jsx";
const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, role } = useSelector((state) => state.auth);
  const role_id = useSelector((state) => state.auth.staff?.role_id || null);
  console.log("Getting from Redux", role, role_id);
  

    // useEffect(() => {
    //   dispatch(fetchPermissions());
    //   if (role_id) {
    //     dispatch(fetchRolePermissions(role_id));
    //   }
    // }, [dispatch, role_id]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ username, password }));

    if (result.meta.requestStatus === "fulfilled") {
      const role_id = result.payload?.staff?.role_id; // Adjust based on your payload structure
    if (role_id) {
      localStorage.setItem("role_id", role_id);
      dispatch(fetchRolePermissions(role_id));
      navigate("/admin/dashboard");
    }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
