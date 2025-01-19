
import * as UserModel from '../models/userModel.js';

// export const getPermissionsByRole = async (req, res) => {
//   // const { role_id } = req.params;
//   try {
//     console.log("Fetching permissions...");
//     const permissions = await UserModel.getPermissionsByRoleModel(1);
//     res.status(200).json(permissions);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch permissions' });
//   }
// };

// export const getAllPermissions = async (req, res) => {
//   try {
//     console.log("Fetching all permissions...");
//     const permissions = await UserModel.getAllPermissionsModel();
//     res.status(200).json({ permissions });
//   } catch (error) {
//     console.error('Error fetching all permissions:', error);
//     res.status(500).json({ error: 'Failed to fetch all permissions' });
//   }
// };


export const getAllPermissions = async (req, res) => {
  try {
    console.log("get all  0000" )
    // Fetch all permissions grouped by role
    const permissions = await UserModel.getPermissions(); // Assume this fetches from the DB

    if (!permissions || permissions.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No permissions found' 
      });
    }
    
    // Group permissions by role_name
    const groupedPermissions = {};
    permissions.forEach(permission => {
      const { role_name } = permission;

      if (!groupedPermissions[role_name]) {
        groupedPermissions[role_name] = [];
      }

      groupedPermissions[role_name].push({
        permission_name: permission.permission_name,
        permission_category_id: permission.permission_category_id,
        can_view: permission.can_view,
        can_add: permission.can_add,
        can_edit: permission.can_edit,
        can_delete: permission.can_delete,
      });
    });

    res.status(200).json({ 
      success: true,
      message: 'Permissions retrieved successfully',
      data: groupedPermissions 
    });
  } catch (error) {
    console.error('Error fetching permissions:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch permissions', 
      error: error.message 
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    console.log("get all cat")
    // Fetch all permissions grouped by role
    const permissions = await UserModel.getAllCate(); // Assume this fetches from the DB

    if (!permissions || permissions.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No permissions found' 
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'Permissions retrieved successfully',
      data:permissions
    });
  } catch (error) {
    console.error('Error fetching permissions:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch permissions', 
      error: error.message 
    });
  }
};
export const getSidebarComp = async (req, res) => {
  try {
    const { role_id } = req.params; // Extract role_id from request parameters
    console.log("Fetching sidebar menus and permissions for role:", role_id);

    // Fetch all sidebar menus
    const menus = await UserModel.getAllSidebarMenu(role_id); // Assume this fetches menus from the DB
    if (!menus || menus.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No sidebar menus found",
      });
    }

    // Fetch role permissions
    const rolePermissions = await UserModel.getSideRolePermission(role_id); 
    console.log(rolePermissions, "role permissions");

    if (!rolePermissions || rolePermissions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No role permissions found",
      });
    }

    // Normalize category names and map them by removing underscores
    const rolePermissionsMap = rolePermissions.reduce((acc, perm) => {
      if (perm.permission_category_name) {
        const normalizedCategory = normalizeCategory(perm.permission_category_name); // Normalize category name by removing underscores
        acc[normalizedCategory] = perm; // Map permissions by normalized category name
      } else {
        console.warn("Missing permission_category_name in:", perm);
      }
      return acc;
    }, {});

    // Filter menus based on role permissions and group them by sidebar_menu_id
    const filteredMenus = menus
      .map((menu) => {
        if (menu.access_permissions) {
          // Parse access_permissions: "(category, flag) || (category, flag) || ..."
          const accessConditions = menu.access_permissions
            .split(" || ") // Split by "||" to get individual conditions
            .map((condition) =>
              condition
                .replace(/[()']/g, "") // Remove parentheses and quotes
                .trim()
                .split(",") // Split category and flag
            );

          

          // Check if any of the conditions are allowed
          const isAllowed = accessConditions.some(([category, flag]) => {
            category = normalizeCategory(category.trim()); // Normalize category name (remove underscores)
            flag = flag.trim(); // Ensure flag is clean
            console.log(category, flag, "________________");

              // Check if the role is superadmin with role_id = 1
              if (category === "superadmin" && flag === "can_view" && role_id === "1") {
                return true; // Grant access to menus for role_id 1
              }
            const rolePermission = rolePermissionsMap[category];// Look up using normalized category name
            console.log(rolePermission, "role permission");

            

            return rolePermission && rolePermission[flag] === 1; // Match category and flag
          });

          // if (isAllowed) {
          //   // Return the menu if allowed
          //   return menu;
          // }
          if (isAllowed) {
            // Add permission_category_id to the menu object
            const categoryPermission = accessConditions.find(([category]) =>
              rolePermissionsMap[normalizeCategory(category.trim())]
            );
            if (categoryPermission) {
              const normalizedCategory = normalizeCategory(categoryPermission[0].trim());
              const rolePermission = rolePermissionsMap[normalizedCategory];
              if (rolePermission) {
                menu.permission_category_id = rolePermission.permission_category_id;
              }
            }
            // Return the menu if allowed
            return menu;
          }
        }
        return null; // Exclude menu if no access
      })
      .filter(Boolean) // Remove null entries
      .reduce((acc, menu) => {
        // Group submenus under the corresponding sidebar_menu_id
        const existingMenu = acc.find((item) => item.sidebar_menu_id === menu.sidebar_menu_id);
        if (existingMenu) {
          existingMenu.submenus.push({
            sidebar_sub_menu_id: menu.sidebar_sub_menu_id,
            submenu_name: menu.submenu_name,
            url: menu.submenu_url,
            permission_category_id: menu.permission_category_id, // Include permission_category_id
          });
        } else {
          acc.push({
            sidebar_menu_id: menu.sidebar_menu_id,
            menu_name: menu.menu_name,
            icon: menu.icon,
            submenus: [
              {
                sidebar_sub_menu_id: menu.sidebar_sub_menu_id,
                submenu_name: menu.submenu_name,
                url: menu.submenu_url,
                permission_category_id: menu.permission_category_id, // Include permission_category_id
              },
            ],
          });
        }
        return acc;
      }, []);

    // Return filtered menus in response
    res.status(200).json({
      success: true,
      message: "Sidebar menus retrieved successfully",
      data: filteredMenus,
    });
  } catch (error) {
    console.error("Error fetching sidebar menus and permissions:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Helper function to normalize category names by removing underscores
function normalizeCategory(str) {
  return str.replace(/[_\s]/g, '').toLowerCase(); // Remove underscores and spaces, then convert to lowercase
}




export const getDataPremission  = async (req, res) => {
  try {
    console.log("get all cat")
    // Fetch all permissions grouped by role
    const permissions = await UserModel.getaddPerm(); // Assume this fetches from the DB

    if (!permissions || permissions.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No permissions found' 
      });
    }
    
    // Group permissions by role_name
    // const groupedPermissions = {};
    // permissions.forEach(permission => {
    //   const { role_name } = permission;

    //   if (!groupedPermissions[role_name]) {
    //     groupedPermissions[role_name] = [];
    //   }

    //   groupedPermissions[role_name].push({
    //     permission_name: permission.permission_name,
    //     permission_category_id: permission.permission_category_id,
    //     can_view: permission.can_view,
    //     can_add: permission.can_add,
    //     can_edit: permission.can_edit,
    //     can_delete: permission.can_delete,
    //   });
    // });

    res.status(200).json({ 
      success: true,
      message: 'Permissions retrieved successfully',
      data:permissions
    });
  } catch (error) {
    console.error('Error fetching permissions:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch permissions', 
      error: error.message 
    });
  }
};

export const getPermissionGroup  = async (req, res) => {
  try {
    console.log("get all cat")
    // Fetch all permissions grouped by role
    const permissions = await UserModel.getGroupPerm(); // Assume this fetches from the DB

    if (!permissions || permissions.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No permissions found' 
      });
    }
    


    res.status(200).json({ 
      success: true,
      message: 'Permissions retrieved successfully',
      data:permissions
    });
  } catch (error) {
    console.error('Error fetching permissions:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch permissions', 
      error: error.message 
    });
  }
};


export const getPermissionStudentParent  = async (req, res) => {
  try {
    console.log("get all cat")
    // Fetch all permissions grouped by role
    const permissions = await UserModel.getPermStudentParent(); // Assume this fetches from the DB

    if (!permissions || permissions.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No permissions found' 
      });
    }
    


    res.status(200).json({ 
      success: true,
      message: 'Permissions retrieved successfully',
      data:permissions
    });
  } catch (error) {
    console.error('Error fetching permissions:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch permissions', 
      error: error.message 
    });
  }
};
export const getAllPermissionsById = async (req, res) => {
  const { role_id } = req.params;
  try {
    console.log("get all permission")
    // Fetch all permissions grouped by role
    const permissions = await UserModel.getPermissionById(role_id); // Assume this fetches from the DB

    if (!permissions || permissions.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No permissions found' 
      });
    }

   
 
    // Respond with the grouped permissions
    res.status(200).json({ 
      success: true,
      message: 'Permissions retrieved successfully',
      data: permissions // Send the grouped permissions
    });
  } catch (error) {
    console.error('Error fetching permissions:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch permissions', 
      error: error.message 
    });
  }
};
export const getStaffPermissions = async (req, res) => {
  try {
    console.log("get  all staff")
    // Fetch all permissions grouped by role
    const permissions = await UserModel.getPermissionById(req.user.role_id); // Assume this fetches from the DB
    if (!permissions || permissions.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No permissions found' 
      });
    }

    console.log(permissions.role_id);
   // Fetch the username (or role name)
   const username = await UserModel.getRoleById(req.user.role_id);
   console.log("User's Role:", username);

   // Ensure username and username.name are available
   if (!username || !username.name) {
     return res.status(400).json({
       success: false,
       message: 'Role name not found for the user'
     });
   }

   // Group permissions by role_name
   const groupedPermissions = {};

   // Initialize the array for the role if not already initialized
   if (!groupedPermissions[username.name]) {
     groupedPermissions[username.name] = []; // Initialize an empty array
   }

   // Add permissions to the array for this role
   groupedPermissions[username.name].push(...permissions);

   // Respond with the grouped permissions
   res.status(200).json({ 
     success: true,
     message: 'Permissions retrieved successfully',
     data: groupedPermissions // Send the grouped permissions
   });
 } catch (error) {
    console.error('Error fetching permissions:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch permissions', 
      error: error.message 
    });
  }
};
// // Bulk Update Permissions for Role
// export const bulkUpdatePermissionsForRole = async (req, res) => {
//   const { role_id } = req.params;
//   const { permissions } = req.body; // Expecting an array of permissions

//   if (!permissions || !Array.isArray(permissions)) {
//     return res.status(400).json({ error: 'Invalid permissions data. Expected an array of permission objects.' });
//   }

//   try {
//     const affectedRows = await UserModel.bulkUpdatePermissionsForRole(role_id, permissions);

//     res.status(200).json({
//       message: 'Permissions updated successfully',
//       affectedRows,
//       role_id,
//       permissions
//     });
//   } catch (error) {
//     console.error('Error updating permissions:', error.message);
//     res.status(500).json({ error: 'Failed to bulk update permissions for role' });
//   }
// };

// // models/userModel.js


// Bulk Update Permissions for Role by Role Name and Category Name
// export const bulkUpdatePermissionsForRoleByNames = async (req, res) => {
//   const { name } = req.params;
//   const { permissions } = req.body; // Expecting an array of permission objects with category_name

//   if (!permissions || !Array.isArray(permissions)) {
//     return res.status(400).json({ error: 'Invalid permissions data. Expected an array of permission objects.' });
//   }

//   try {
//     // Fetch role_id by role_name
//     const role_id = await UserModel.getRoleIdByName(name);
//     if (!role_id) {
//       return res.status(404).json({ error: 'Role not found with the given name' });
//     }

//     // Map category names to their IDs
//     const permissionUpdates = [];
//     for (const permission of permissions) {
//       const permission_category_id = await UserModel.getPermissionCategoryIdByName(permission.name);
//       if (!permission_category_id) {
//         return res.status(404).json({ error: `Permission category '${permission.name}' not found` });
//       }
//       permissionUpdates.push({
//         permission_category_id,
//         can_view: permission.can_view,
//         can_add: permission.can_add,
//         can_edit: permission.can_edit,
//         can_delete: permission.can_delete,
//       });
//     }

//     // Perform bulk update
//     const affectedRows = await UserModel.bulkUpdatePermissionsForRole(role_id, permissionUpdates);

//     res.status(200).json({
//       message: 'Permissions updated successfully',
//       affectedRows,
//       name,
//       permissions: permissionUpdates,
//     });
//   } catch (error) {
//     console.error('Error updating permissions:', error.message);
//     res.status(500).json({ error: 'Failed to bulk update permissions for role' });
//   }
// };

// [
  // authorizeRole([1, 2]),


  // ...............main code for....................
// export const bulkUpdatePermissionsForRoleById  =async (req, res) => {
//   const { role_id } = req.params;
//   const { permissions } = req.body; // Expecting an array of permission objects with category_name

//   if (!permissions || !Array.isArray(permissions)) {
//     return res.status(400).json({ error: 'Invalid permissions data. Expected an array of permission objects.' });
//   }

//   try {
//     // Validate if role_id exists
//     const roleExists = await UserModel.checkRoleExistsById(role_id);
//     if (!roleExists) {
//       return res.status(404).json({ error: 'Role not found with the given ID' });
//     }

//     // Map category names to their IDs
//     const permissionUpdates = [];
//     for (const permission of permissions) {
//       const permission_category_id = await UserModel.getPermissionCategoryIdByName(permission.name);
//       if (!permission_category_id) {
//         return res.status(404).json({ error: `Permission category '${permission.name}' not found` });
//       }
//       permissionUpdates.push({
//         permission_category_id,
//         can_view: permission.can_view,
//         can_add: permission.can_add,
//         can_edit: permission.can_edit,
//         can_delete: permission.can_delete,
//       });
//     }

//     // Perform bulk update
//     const affectedRows = await UserModel.bulkUpdatePermissionsForRole(role_id, permissionUpdates);

//     res.status(200).json({
//       message: 'Permissions updated successfully',
//       affectedRows,
//       role_id,
//       permissions: permissionUpdates,
//     });
//   } catch (error) {
//     console.error('Error updating permissions:', error.message);
//     res.status(500).json({ error: 'Failed to bulk update permissions for role' });
//   }
// };
// .............................main code end .............................

export const bulkUpdatePermissionsForRoleById = async (req, res) => {
  const { role_id } = req.params;
  const { permissions } = req.body; // Expecting an array of permission objects with category_name
  if (!permissions || !Array.isArray(permissions)) {
    return res.status(400).json({ error: 'Invalid permissions data. Expected an array of permission objects.' });
  }
  try {
    // Validate if role_id exists
    const roleExists = await UserModel.checkRoleExistsById(role_id);
    if (!roleExists) {
      return res.status(404).json({ error: 'Role not found with the given ID' });
    }
    // Map category names to their IDs
    const permissionUpdates = [];
    for (const permission of permissions) {
      const permission_category_id = permission.permission_category_id;
      //await UserModel.getPermissionCategoryIdByName(permission.name);
      if (!permission_category_id) {
        return res.status(404).json({ error: `Permission category '${permission.name}' not found` });
      }
      permissionUpdates.push({
        permission_category_id,
        can_view: permission.can_view,
        can_add: permission.can_add,
        can_edit: permission.can_edit,
        can_delete: permission.can_delete,
      });
    }
    // Perform bulk update
    const affectedRows = await UserModel.bulkUpdatePermissionsForRole(role_id, permissionUpdates);
    res.status(200).json({
      message: 'Permissions updated successfully',
      affectedRows,
      role_id,
      permissions: permissionUpdates,
    });
  } catch (error) {
    console.error('Error updating permissions:', error.message);
    res.status(500).json({ error: 'Failed to bulk update permissions for role' });
  }
};


export const getPermissionFeature = async (req, res) => {
const role_id = parseInt(req.params.role_id); // Get roleId from URL parameter
console.log("get the role_id ",role_id)

const feature = await UserModel.getEnabledFeaturesForRole(role_id, (err, features) => {


  console.log("feature ", feature)
  if (err) {
    return res.status(500).send('Error fetching enabled features');
  }

  if (features.length === 0) {
    return res.status(404).send('No enabled features found for this role');
  }
});
  // Return the enabled features to the frontend
  // res.status(200).json({ feature });


// Return the enabled features to the frontend
res.status(200).json({ feature });
}
