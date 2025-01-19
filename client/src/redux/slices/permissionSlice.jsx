
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from "../../api/axiosApi.jsx";
export const fetchPermissions = createAsyncThunk(
  'permissions/fetchPermissions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get('auth/perm/permission_cat');
      return response.data.data;

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchRolePermissions = createAsyncThunk(
  'permissions/fetchRolePermissions',
  async (roleId, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`auth/perm/permission/${roleId}`);
      console.log(response,"permisssion check ")
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const saveRolePermissions = createAsyncThunk(
  'permissions/saveRolePermissions',
  async ({ roleId, permissions }, { rejectWithValue }) => {
    try {
      const payload = { role_id: roleId, permissions };
      const response = await axiosApi.put(`/auth/roles/permissions/${roleId}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const permissionSlice = createSlice({
  name: 'permissions',
  initialState: {
    permissions: [],
    rolePermissions: [],
    loading: false,
    error: null,
  },
  reducers: {
    updatePermission(state, action) {
      const { categoryId, actionType, isEnabled } = action.payload;
      const rolePermission = state.rolePermissions.find(
        (perm) => perm.permission_category_id === categoryId
      );
      if (rolePermission) {
        rolePermission[actionType] = isEnabled ? 1 : 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRolePermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRolePermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.rolePermissions = action.payload;
      })
      .addCase(fetchRolePermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveRolePermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveRolePermissions.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveRolePermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { updatePermission } = permissionSlice.actions;


export default permissionSlice.reducer;