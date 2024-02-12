import React, { useContext } from "react";
import { AuthContext } from "../context/context";
import Sidebar from "./components/sidebar/Sidebar";

const Dashboard = () => {
  const { getAllUsers } = useContext(AuthContext);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
    </div>
  );
};

export default Dashboard;
