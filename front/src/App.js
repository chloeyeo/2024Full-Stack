import "./assets/css/tailwindStyle.scss";
import React from "react"; // to use jsx
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import NavBar from "./layout/NavBar";

function Layout() {
  return (
    <>
      <NavBar />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
