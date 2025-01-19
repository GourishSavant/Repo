import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from "../../api/axiosApi"; // Your axios instance

// Async thunk for fetching staff data
export const fetchStaff = createAsyncThunk('staff/fetchStaff', async () => {
  const response = await axiosApi.get('/auth/getAllStaff');
  return response.data;
});

const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can define additional reducers for staff management here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default staffSlice.reducer;
