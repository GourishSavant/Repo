// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axiosApi from "../../api/axiosApi.jsx";
// const AssignPermission = () => {
//   const { roleName, role_id } = useParams(); // Retrieve role name from URL
//   const [permissions, setPermissions] = useState([]);
//   const [rolePermissions, setRolePermissions] = useState([]); // Role-specific permissions
//   useEffect(() => {
//     const fetchPermissions = async () => {
//       try {
//         // Fetch all permission categories
//         const response = await axiosApi.get("auth/perm/permission_cat");
//         if (response.data.success) {
//           setPermissions(response.data.data); // Set permission categories
//         } else {
//           console.error(
//             "Failed to fetch permissions (Categories):",
//             response.data.message
//           );
//         }
//         // Fetch permissions for the specific role_id
//         if (role_id) {
//           const resp = await axiosApi.get(`auth/perm/permission/${role_id}`);
//           if (resp.data.success) {
//             setRolePermissions(resp.data.data);
//           } else {
//             console.error(
//               "Failed to fetch permissions (Role-Based):",
//               resp.data.message
//             );
//             setRolePermissions([]);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching permissions:", error.message);
//         setRolePermissions([]);
//       }
//     };
//     if (role_id) {
//       fetchPermissions();
//     }
//   }, [role_id]);
//   // Check if permission is enabled for a specific action
//   const isPermissionEnabled = (categoryId, action) => {
//     const rolePerm = rolePermissions.find(
//       (perm) => perm.permission_category_id === categoryId
//     );
//     return rolePerm ? rolePerm[action] === 1 : false; // Return true if the action is enabled
//   };
//     const handleCheckboxChange = (event, categoryId, action) => {
//       const isChecked = event.target.checked;
//       setRolePermissions((prev) =>
//         prev.map((perm) =>
//           perm.permission_category_id === categoryId
//             ? { ...perm, [action]: isChecked ? 1 : 0 }
//             : perm
//         )
//       );
//     };
//     const handleSavePermissions = async () => {
//       try {
//         // Prepare the payload for the API call
//         const payload = {
//           role_id,
//           permissions: rolePermissions,
//         };
//         console.log("payload", payload);
//         // Send the updated permissions to the backend
//         const response = await axiosApi.put(`/auth/roles/permissions/${role_id}`, payload);
//         console.log("response", response);
//         if (response.status == 200) {
//           alert("Permissions updated successfully!");
//         } else {
//           console.error("Failed to update permissions:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error updating permissions:", error.message);
//         alert("An error occurred while updating permissions.");
//       }
//     };
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPermissions,
  fetchRolePermissions,
  saveRolePermissions,
  updatePermission,
} from "../../redux/slices/permissionSlice.jsx";
const AssignPermission = () => {
  const { roleName, role_id } = useParams();
  const dispatch = useDispatch();
  const { permissions, rolePermissions, loading } = useSelector(
    (state) => state.permissions
  );
//   console.log("permission", permissions)
  useEffect(() => {
    dispatch(fetchPermissions());
    if (role_id) {
        console.log(role_id,"hh")
      dispatch(fetchRolePermissions(role_id));
      console.log("hjk")
    }
  }, [dispatch, role_id]);
  const isPermissionEnabled = (categoryId, action) => {
    // console.log(categoryId,"ctegory id ")

    const rolePerm = rolePermissions.find(
      (perm) => perm.permission_category_id === categoryId
    );
    // console.log(rolePerm," ghjjklffhis")
    return rolePerm ? rolePerm[action] === 1 : false;
  };
  const handleCheckboxChange = (event, categoryId, action) => {
    dispatch(
      updatePermission({
        categoryId,
        actionType: action,
        isEnabled: event.target.checked,
      })
    );
  };
  const handleSavePermissions = () => {
    dispatch(saveRolePermissions({ roleId: role_id, permissions: rolePermissions }));

    console.log(role_id , rolePermissions ,"save daat check ")
  };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">({roleName}) Assign Permissions</h1>
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 sticky top-0 z-10">
                            <th className="border border-gray-300 px-4 py-2">Module</th>
                            <th className="border border-gray-300 px-4 py-2">Feature</th>
                            <th className="border border-gray-300 px-4 py-2">View</th>
                            <th className="border border-gray-300 px-4 py-2">Add</th>
                            <th className="border border-gray-300 px-4 py-2">Edit</th>
                            <th className="border border-gray-300 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                        <tbody>
                        {permissions.map((permission, index) => {
                            // console.log(permissions ,"bhhhhhhhhhhh")
                            const isFirstInCategory =
                            index === 0 || permissions[index - 1].module !== permission.module;
                            return (
                            <tr key={index} className="odd:bg-gray-100">
                                {/* Render the module name only if it's the first row of that module */}
                                <td className="border border-gray-300 px-4 py-2 font-bold">
                                {isFirstInCategory ? permission.module || "N/A" : ""}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{permission.name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                {permission.enable_view ? (
                                    <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={isPermissionEnabled(
                                        permission.permission_category_id,
                                        "can_view"
                                    )}
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                        e,
                                        permission.permission_category_id,
                                        "can_view"
                                        )
                                    }
                                    />
                                ) : (
                                    <span></span>
                                )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                {permission.enable_add ? (
                                    <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={isPermissionEnabled(
                                        permission.permission_category_id,
                                        "can_add"
                                    )}
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                        e,
                                        permission.permission_category_id,
                                        "can_add"
                                        )
                                    }
                                    />
                                ) : (
                                    <span></span>
                                )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                {permission.enable_edit ? (
                                    <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={isPermissionEnabled(
                                        permission.permission_category_id,
                                        "can_edit"
                                    )}
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                        e,
                                        permission.permission_category_id,
                                        "can_edit"
                                        )
                                    }
                                    />
                                ) : (
                                    <span></span>
                                )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                {permission.enable_delete ? (
                                    <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={isPermissionEnabled(
                                        permission.permission_category_id,
                                        "can_delete"
                                    )}
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                        e,
                                        permission.permission_category_id,
                                        "can_delete"
                                        )
                                    }
                                    />
                                ) : (
                                    <span></span>
                                )}
                                </td>
                            </tr>
                            );
                        })}
                        </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                type="submit"
                onClick={handleSavePermissions}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Save Permissions
                </button>
            </div>
        </div>
    );
};
export default AssignPermission;









