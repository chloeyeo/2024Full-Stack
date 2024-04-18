import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Put token into request before axios request is sent to server
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken"); // token at the end.
    // "accessToken" is the key of a key-value pair in localStorage.
    // getItem gets the value of the key-value pair with key "accessToken", from localStorage.
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(
      "error adding token into request before sending request to server"
    );
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // when user logs in, token is created (after axios request made) and token gets sent with the response OR
    // if login fail (check if token expired)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // error means jwt token expired
    if (error.response.data === "jwt expired") {
      // reload page
      window.location.reload(); // make user go to "Home" page.
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
