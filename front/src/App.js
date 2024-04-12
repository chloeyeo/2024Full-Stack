import "./assets/css/tailwindStyle.scss";
import React from "react"; // to use jsx
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import NavBar from "./layout/NavBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}></Route>
        <Route
          path="/login"
          element={
            <>
              <NavBar />
              <LoginPage />
            </>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <>
              <NavBar />
              <RegisterPage />
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
