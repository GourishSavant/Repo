// In your permissionSlice.js or permissionSlice.js file
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from "../../api/axiosApi.jsx";

// Async thunk to fetch canAdd permission
export const fetchCategoryPermission = createAsyncThunk(
  'permissions/CategoryPermissions',
  async ({ role_id, name }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/auth/permission-category/${name}/id/${role_id}`);
      return response.data.data; // Return the permission data from the response
    } catch (error) {
      return rejectWithValue(error.response.data); // Return the error if request fails
    }
  }
);

// Redux slice
const permissionSlice = createSlice({
  name: 'permissions',
  initialState: {
    canAdd: 0, // Default to 0 if permission isn't set
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryPermission.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryPermission.fulfilled, (state, action) => {
        state.loading = false;
        state.canAdd = action.payload.can_add || 0; // Set the value of canAdd based on the response
        state.error = null;
      })
      .addCase(fetchCategoryPermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch permissions'; // Handle error
      });
  },
});

export default permissionSlice.reducer;
