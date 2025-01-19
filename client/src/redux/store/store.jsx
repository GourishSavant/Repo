// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../slices/authSlice.jsx";
// import rolesReducer from '../slices/roleSlice.jsx';
// import staffReducer from '../slices/stafffSlice.jsx';
// import permissionReducer from '../slices/permissionSlice.jsx';
// // import fetchPermissionsMiddleware  from '../../middleware/fetchPermissionsMiddleware.jsx';
// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     roles: rolesReducer,
//     staff: staffReducer,
//     permissions: permissionReducer,

//   },
//   // middleware: (getDefaultMiddleware) =>
//   //   getDefaultMiddleware().concat(fetchPermissionsMiddleware),
// });

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.jsx";
import rolesReducer from "../slices/roleSlice.jsx";
import staffReducer from "../slices/stafffSlice.jsx";
import permissionReducer from "../slices/permissionSlice.jsx";
import studentReducer from "../slices/studentauthSlice.jsx";
import getStudentsReducer from "../slices/getStudentsSlice.jsx";
import createStudentReducer from "../slices/studentSlice.jsx";
const store = configureStore({
  reducer: {
    auth: authReducer,
    studentAuth: studentReducer,
    roles: rolesReducer,
    staff: staffReducer,
    permissions: permissionReducer,
    getStudents: getStudentsReducer,
    createStudent: createStudentReducer,
  },
});
export default store;