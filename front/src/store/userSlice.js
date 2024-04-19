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
  isAuth: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log("loginUser.pending");
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        console.log("state.userData after login fulfilled", state.userData);
        toast.success(action.payload.message);
        state.isAuth = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("loginUser.rejected");
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
        state.isAuth = false;
      })
      .addCase(authUser.pending, (state) => {
        console.log("authUser.pending");
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        console.log("authUser.fulfilled");
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        console.log("authUser.rejected");
        state.isLoading = false;
        state.userData = initialState.userData;
        localStorage.removeItem("accessToken");
        state.error = action.payload;
        state.isAuth = false;
      })
      .addCase(logoutUser.pending, (state) => {
        console.log("logoutUser.pending");
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log("logoutUser.fulfilled");
        state.isLoading = false;
        state.userData = initialState.userData;
        localStorage.removeItem("accessToken");
        state.isAuth = false;
        console.log(
          "action.payload after logoutUser.fulfilled",
          action.payload
        ); // payload is undefined!
        toast.success(action.payload.message);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.log("logoutUser.rejected");
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      });
  },
});

export default userSlice.reducer;
