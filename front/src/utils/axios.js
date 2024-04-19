import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});



axiosInstance.interceptors.request.use(
  function (config) {
      console.log("accessToken from localStorage:",localStorage.getItem("accessToken"))
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken");
    return config;
  },
  function (error) {
    console.log(
      "error adding token into request before sending request to server"
    );
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data === "jwt expired") {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
