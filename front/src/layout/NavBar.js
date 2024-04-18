import React from "react";
import { Link } from "react-router-dom";
// navigate is only for page change!

const NavBar = () => {
  const routes = [
    { to: "/login", name: "login", auth: false },
    { to: "/register", name: "register", auth: false },
    { to: "/company", name: "company", auth: true },
  ];
  return (
    <div className="w-full shadow-md">
      <div className="container m-auto  flex justify-between">
        <h1 className="font-semibold p-4">
          <Link to="/">COMPANY</Link>
        </h1>
        <ul className="flex">
          {routes.map((route, i) => {
            return (
              <li key={`menuItem-${i}`}>
                <Link
                  className="h-full flex px-4 justify-center items-center"
                  to={route.to}
                >
                  {route.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
