import { Navigate, Outlet } from "react-router-dom";

const NotAuthRouter = ({ isAuth }) => {
  return isAuth ? <Navigate to="/login" /> : <Outlet />;
};

export default NotAuthRouter;
