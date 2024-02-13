import React, { Children, useContext } from "react";
import { AuthContext } from "../context/context";
import "./index.css";
import Sidebar from "./components/sidebar/Sidebar";
import Information from "./components/information/Information";

const Dashboard = ({Children}) => {
  const { getAllUsers } = useContext(AuthContext);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="main-info">
        <Information />
        <div className="main">
          {Children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
