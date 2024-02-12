import React, { useContext } from "react";
import { AuthContext } from "../context/context";
import Sidebar from "./components/sidebar/Sidebar";
import Information from "./components/information/Information";

const Dashboard = () => {
  const { getAllUsers } = useContext(AuthContext);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="main-info">
        <Information />
        <div className="main">
          welcome to Admin Panel
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
