import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const loginUser = createAsyncThunk("user/loginuser", async (body) => {
  try {
    const response = await axiosInstance.post("/user/login", body);
    console.log("login");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
});

export const authUser = createAsyncThunk("user/authuser", async () => {
  try {
    console.log("about to send get request to auth");
    const response = await axiosInstance.get("/user/auth");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
});

export const logoutUser = createAsyncThunk("user/logoutuser", async () => {
  try {
    const response = await axiosInstance.post("/user/logout");
    console.log("logout");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
});
