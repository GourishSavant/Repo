import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosApi.jsx";
// Async thunk for student login
export const loginStudent = createAsyncThunk(
  "auth/loginStudent",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/auth/userLogin", {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      // Capture and provide a fallback error message
      return rejectWithValue(
        error.response?.data?.error || "An unexpected error occurred. Please try again."
      );
    }
  }
);
const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  student: JSON.parse(localStorage.getItem("student")) || null,
  isLoading: false,
  error: null,
};
const studentAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.student = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        const { accessToken, refreshToken, student } = action.payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.student = student;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("student", JSON.stringify(student));
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { logout } = studentAuthSlice.actions;
export default studentAuthSlice.reducer;