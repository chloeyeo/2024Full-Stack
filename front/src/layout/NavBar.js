import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/thunkFunctions";
// navigate is only for page change!

const NavBar = () => {
  const routes = [
    { to: "/login", name: "login", auth: false },
    { to: "/register", name: "register", auth: false },
    { to: "/company", name: "company", auth: true },
    { to: "", name: "logout", auth: true },
  ];
  const isAuth = useSelector((state) => state.user?.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(logoutUser());
    navigate("/");
  }
  return (
    <div className="w-full shadow-md">
      <div className="container m-auto  flex justify-between">
        <h1 className="font-semibold p-4">
          <Link to="/">LOGO</Link>
        </h1>
        <ul className="flex">
          {routes.map(({ to, name, auth }) => {
            if (isAuth !== auth) return null;
            if (name === "logout") {
              return (
                <li key={`menuItem-${name}`}>
                  <Link
                    className="h-full flex px-4 justify-center items-center"
                    onClick={handleLogout}
                  >
                    {name}
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={`menuItem-${name}`}>
                  <Link
                    className="h-full flex px-4 justify-center items-center"
                    to={to}
                  >
                    {name}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
