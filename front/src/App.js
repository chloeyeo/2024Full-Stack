import "./assets/css/tailwindStyle.scss";
import React, { useEffect } from "react";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import NavBar from "./layout/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { authUser } from "./store/thunkFunctions";
import FooterPage from "./pages/FooterPage/FooterPage";
import CompanyPage from "./pages/CompanyPage/CompanyPage";
import NotAuthRouter from "./components/NotAuthRouter";
import ProtectedRouter from "./components/ProtectedRouter";

function Layout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <FooterPage />
    </>
  );
}

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  console.log("pathname:", pathname);
  useEffect(() => {
    if (isAuth) dispatch(authUser());
  }, [isAuth, dispatch, pathname]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<NotAuthRouter isAuth={isAuth} />}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Route>
        <Route element={<ProtectedRouter isAuth={isAuth} />}>
          <Route path="/company" element={<CompanyPage />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
