import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosApi.jsx";
// Async thunk for fetching students data
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axiosApi.get('/auth/getAllStudents');
  console.log(response , "auth ")
  return response.data;
});
const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default studentsSlice.reducer;