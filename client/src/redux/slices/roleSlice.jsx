import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../api/axiosApi';

// Thunk to fetch roles
export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get('/auth/getRoles');
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Thunk to add a new role
export const addRole = createAsyncThunk('roles/addRole', async (role, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('/auth/roles', role);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Thunk to update a role
export const updateRole = createAsyncThunk('roles/updateRole', async (role, { rejectWithValue }) => {
  try {
    const response = await axiosApi.put(`/auth/editRole/${role.role_id}`, role);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Thunk to delete a role
export const deleteRole = createAsyncThunk('roles/deleteRole', async (role_id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/auth/roles/${role_id}`);
    return role_id;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Roles
      .addCase(fetchRoles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add Role
      .addCase(addRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      // Update Role
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex((role) => role.role_id === action.payload.role_id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })
      // Delete Role
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter((role) => role.role_id !== action.payload);
      });
  },
});

export default rolesSlice.reducer;
