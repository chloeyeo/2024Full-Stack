import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const loginUser = createAsyncThunk("user/loginuser", async (body) => {
  try {
    const response = await axiosInstance.post("/user/login", body);
    console.log("login");
    console.log("login response.data", response.data);
    return response.data;
  } catch (error) {
    console.log("login response error");
    return console.error(error.message);
  }
});

export const authUser = createAsyncThunk("user/authuser", async () => {
  try {
    console.log("about to send get request to auth");
    const response = await axiosInstance.get("/user/auth");
    console.log("authorise");
    console.log("auth response.data", response.data);
    return response.data;
  } catch (error) {
    console.log("auth response error");
    return console.error(error.message);
  }
});

export const logoutUser = createAsyncThunk("user/logoutuser", async () => {
  try {
    const response = await axiosInstance.post("/user/logout");
    console.log("logout");
    console.log("logout response.data", response.data);
    return response.data;
  } catch (error) {
    console.log("logout response error");
    return console.error(error.message);
  }
});
