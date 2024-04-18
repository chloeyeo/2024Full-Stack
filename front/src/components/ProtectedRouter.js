import { Outlet, Navigate } from "react-router-dom";

const ProtectedRouter = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouter;
