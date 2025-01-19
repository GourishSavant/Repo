// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosApi from "../../api/axiosApi.jsx";

// // Async thunk for login
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ username, password }, { rejectWithValue }) => {
//     try {
//       const response = await axiosApi.post("/auth/login", {
//         email: username,
//         password,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.error || "Login failed. Please try again."
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     accessToken: null,
//     refreshToken: null,
//     staff: null,
//     role: null,
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.accessToken = null;
//       state.refreshToken = null;
//       state.staff = null;
//       state.role = null;
//       localStorage.clear(); // Clear tokens on logout
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         const { accessToken, refreshToken, staff } = action.payload;
//         state.accessToken = accessToken;
//         state.refreshToken = refreshToken;
//         state.staff = staff;
//         state.role = staff.role;

//         // Save tokens and staff data to localStorage
//         localStorage.setItem("accessToken", accessToken);
//         // localStorage.setItem("refreshToken", refreshToken);
//         localStorage.setItem("staff", JSON.stringify(staff));
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosApi.jsx";
// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/auth/login", {
        email: username,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Login failed. Please try again."
      );
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    refreshToken: null,
    staff: null,
    role: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.staff = null;
      state.role = null;
      localStorage.clear(); // Clear tokens on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { accessToken, refreshToken, staff } = action.payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.staff = staff;
        state.role = staff.role;
        // Save tokens and staff data to localStorage
        localStorage.setItem("accessToken", accessToken);
        // localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("staff", JSON.stringify(staff));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;