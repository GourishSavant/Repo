import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosApi.jsx";
// Thunk to create student
export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/auth/createStudent', studentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const studentSlice = createSlice({
  name: 'createStudent',
  initialState: {
    isLoading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStudent.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});
export const { resetStatus } = studentSlice.actions;
export default studentSlice.reducer;