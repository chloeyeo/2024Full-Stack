import { createSlice } from "@reduxjs/toolkit";
import { loginUser, authUser, logoutUser } from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
  userData: {
    id: "",
    email: "",
    username: "",
    role: 0,
    image: "",
    createdAt: "",
  },
  // userSlice.user.isAuth
  // state.user.isAuth (when using useSelector)
  isAuth: false, // as soon as user goes to a page, isAuth is checked
  isLoading: false,
};

const userSlice = createSlice({
  // state.user
  name: "user", // userSlice.user
  initialState,
  reducers: {},
  // extraReducers takes care of the async
  extraReducers: (builder) => {
    // loginUser = authenticaltion, authUser = authorization (to allow page visits)!
    // builder.addCase().addCase().addCase(); // ... and so on you keeo on adding .addCase();
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        toast.success(action.payload.message); //.message
        state.isAuth = true;
        // put accessToken into localStorage
        localStorage.setItem("accessToken", action.payload.accessToken); //.accessToken
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
        state.isAuth = false;
      })
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        // set userData back to initialState
        state.userData = initialState.userData; // user not authenticated thus make userData to initialState
        // remove the invalid/expired token from storage
        localStorage.removeItem("accessToken");
        state.error = action.payload;
        state.isAuth = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = initialState.userData;
        localStorage.removeItem("accessToken");
        state.isAuth = false;
        toast.success(action.payload.message);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      });
    // signup, login, logout all goes in here
  },
});

export default userSlice.reducer;
