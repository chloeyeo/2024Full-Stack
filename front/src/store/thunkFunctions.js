import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/user/register`, body);
      console.log("thunkapi register");
      return response.data;
    } catch (error) {
      console.log("register response error due to", error.message);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginuser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/login", body);
      console.log("thunkapi login");
      console.log("login response.data", response.data);
      return response.data;
    } catch (error) {
      console.log("login response error");
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const authUser = createAsyncThunk(
  "user/authuser",
  async (_, thunkAPI) => {
    try {
      console.log("about to send get request to auth");
      const response = await axiosInstance.get("/user/auth");
      console.log("authorise");
      console.log("auth response.data", response.data);
      return response.data;
    } catch (error) {
      console.log("auth response error");
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
export const authUser = createAsyncThunk(
  "user/authuser",
  async (_, thunkAPI) => {
    try {
      console.log("about to send get request to auth");
      const response = await axiosInstance.get("/user/auth");
      console.log("authorise");
      console.log("auth response.data", response.data);
      return response.data;
    } catch (error) {
      console.log("auth response error");
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutuser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      console.log("logout");
      console.log("logout response.data", response.data);
      return response.data;
    } catch (error) {
      console.log("logout response error");
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logoutuser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      console.log("logout");
      console.log("logout response.data", response.data);
      return response.data;
    } catch (error) {
      console.log("logout response error");
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
