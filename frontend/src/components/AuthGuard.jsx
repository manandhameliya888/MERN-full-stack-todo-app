import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../lib/cookie";

const AuthGuard = ({ children }) => {
  const auth = getCookie("token") ? true : false;

  return auth ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthGuard;
