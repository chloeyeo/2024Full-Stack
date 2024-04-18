import "./assets/css/tailwindStyle.scss";
import React, { useEffect } from "react"; // to use jsx
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, NavLink, Outlet, useLocation } from "react-router-dom";
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
  // isAuth is in userSlice = slice of State
  // thus to get state from a component we use useSelector!
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  console.log("pathname:", pathname);
  useEffect(() => {
    // when user visits a new page this useEffect runs
    // as soon as user visits a page, if token.userId exists in our user db
    // isAuth is true and thus we dispatch authUser()
    // dispatch(function) is always thunk (instead of dispatch({action obj}))
    // i.e. go to thunkFunctions js createAsyncThunk
    if (isAuth) dispatch(authUser());
  }, [isAuth, dispatch, pathname]); // pathname = everytime user visits a new page
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
