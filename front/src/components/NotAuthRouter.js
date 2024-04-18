import { Navigate, Outlet } from "react-router-dom";

const NotAuthRouter = ({ isAuth }) => {
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default NotAuthRouter;
