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
  isAuth: false, // as soon as user goes to a page, isAuth is checked
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  // extraReducers takes care of the async
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        toast.success(action.payload.message);
        state.isAuth = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
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
  },
});

export default userSlice.reducer;
