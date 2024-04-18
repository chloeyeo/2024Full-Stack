import "./assets/css/tailwindStyle.scss";
import React, { useEffect } from "react"; // to use jsx
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import NavBar from "./layout/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { authUser } from "./store/thunkFunctions";

function App() {
  // isAuth is in userSlice = slice of State
  // thus to get state from a component we use useSelector!
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    // when user visits a new page this useEffect runs
    // as soon as user visits a page, if token.userId exists in our user db
    // isAuth is true and thus we dispatch authUser()
    // dispatch(function) is always thunk (instead of dispatch({action obj}))
    // i.e. go to thunkFunctions js createAsyncThunk
    if (isAuth) dispatch(authUser());
  }, []);
  return (
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
  );
}

export default App;
