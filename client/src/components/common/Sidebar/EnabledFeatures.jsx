// import React, { useState, useEffect } from 'react';
// import axiosApi from "../../../api/axiosApi.jsx";
// const EnabledFeatures = () => {
//   const [features, setFeatures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Simulate user role ID (e.g., from a JWT token or session)
//   const role_id = 1; // Example: Role ID from the session or JWT token

//   useEffect(() => {
//     const fetchEnabledFeatures = async () => {
//       try {
//         const response = await axiosApi.get(`/auth/perm/permission/feature/${role_id}`);
//         console.log("response", response )
//         if (!response.ok) {
//           throw new Error('Failed to fetch enabled features');
//         }

//         const data = await response.json();
//         setFeatures(data.features);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEnabledFeatures();
//   }, [role_id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//         <h1>I ma gourish Savant </h1>
//       {/* <h1>Enabled Features for Role</h1>
//       {features.length === 0 ? (
//         <p>No enabled features found for this role</p>
//       ) : (
//         features.map((feature) => (
//           <div key={feature.short_code}>
//             <h3>{feature.name} ({feature.short_code})</h3>
//             <ul>
//               <li>Can View: {feature.can_view ? 'Yes' : 'No'}</li>
//               <li>Can Add: {feature.can_add ? 'Yes' : 'No'}</li>
//               <li>Can Edit: {feature.can_edit ? 'Yes' : 'No'}</li>
//               <li>Can Delete: {feature.can_delete ? 'Yes' : 'No'}</li>
//             </ul>
//           </div>
//         ))
//       )} */}
//     </div>
//   );
// };

// export default EnabledFeatures;
import axios from '../../../api/axiosApi.jsx';
export const fetchPermissions = async () => {
  const response = await axios.get('/auth/perm/permission/feature/:role_id'); 
  console.log("ewf",response)// Adjust API path as needed
  return response.data;
};
