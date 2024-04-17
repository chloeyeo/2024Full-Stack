// dispatch(loginUser(body)); from LoginPage gets dispatched to here (thunkFunction).

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const loginUser = createAsyncThunk(
  // 1. type (=name) 2. function
  "user/loginuser",
  async (body) => {
    try {
      // axios here
      //   const response = await axios.post(); // instead we use axios-create
      const response = await axiosInstance.post("/user/login", body); // body with user email and id etc gets sent along the axios request
      console.log("login");
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const authUser = createAsyncThunk(
  // 1. type (=name) 2. function
  "user/authuser",
  async () => {
    try {
      // axios here
      //   const response = await axios.post(); // instead we use axios-create
      const response = await axiosInstance.post("/user/auth"); // body with user email and id etc gets sent along the axios request
      // console.log("auth");
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);
