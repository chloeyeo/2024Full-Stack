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
import MainPage from "./layout/Main/MainPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import BlogViewPage from "./pages/BlogPage/BlogViewPage";

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
    // on each page visit generate new token = this token is called 'refresh token'
    // when authUser() finds that token does not match it sees this as dispatch changed and thus runs useEffect again
    // when authUser() checks that token indeed matches this is seen as no change to dispatch so useEffect does not get run again and stops there.
  }, [isAuth, dispatch, pathname]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route element={<NotAuthRouter isAuth={isAuth} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRouter isAuth={isAuth} />}>
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:blogId" element={<BlogViewPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
