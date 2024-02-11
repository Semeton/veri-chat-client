import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { token } from "../../lib/Token";

function AuthRoute() {
  return token ? <Outlet /> : <Navigate to="/signin" />;
}

export default AuthRoute;
