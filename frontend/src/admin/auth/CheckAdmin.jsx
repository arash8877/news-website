import React, { useContext } from "react";
import { AuthContext } from "../context/context";
import { Outlet, Navigate } from "react-router-dom";

const CheckAdmin = () => {
  const { admin } = useContext(AuthContext);

  return admin ? <Outlet /> : <Navigate to="/dashboard" replace={true} />;
};

export default CheckAdmin;
