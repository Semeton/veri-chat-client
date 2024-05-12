import { Outlet, Navigate } from "react-router-dom";
import { token } from "../lib/Token";

const AuthRoute = (): JSX.Element => {
  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default AuthRoute;
