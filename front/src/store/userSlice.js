import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    role: 0,
    image: "",
    createdAt: "",
  },
  // userSlice.user.isAuth
  isAuth: false, // as soon as user goes to a page, isAuth is checked
  isLoading: false,
};

const userSlice = createSlice({
  name: "user", // userSlice.user
  initialState,
  reducers: {},
  // extraReducers takes care of the async
  extraReducers: (builder) => {
    //???
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
        toast.error(action.payload);
        state.isAuth = false;
      });
    // signup, login, logout all goes in here
  },
});

export default userSlice.reducer;
