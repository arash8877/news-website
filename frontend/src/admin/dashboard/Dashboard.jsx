import React, { useContext } from "react";
import { AuthContext } from "../context/context";

const Dashboard = () => {
  const { getAllUsers } = useContext(AuthContext);
  return (
    <>
    <button onClick={getAllUsers}>Users</button>
    </>
  );
};

export default Dashboard;
