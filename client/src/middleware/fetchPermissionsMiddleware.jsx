// middleware/fetchPermissionsMiddleware.js
import { loginUser } from "../redux/slices/authSlice.jsx";
import { fetchRolePermissions } from "../redux/slices/permissionSlice.jsx";

const fetchPermissionsMiddleware = (store) => (next) => async (action) => {
  if (action.type === loginUser.fulfilled.type) {
    const { role_id } = action.payload.user; // Assuming role_id is in the payload
    if (role_id) {
      // Dispatch fetchRolePermissions with role_id
      store.dispatch(fetchRolePermissions(role_id));
    }
  }
  return next(action);
};

export default fetchPermissionsMiddleware;
