import React from "react";
import "./Main.css";
import Dashboard from "../../Dashboard";

const Main = () => {
  return (
    <Dashboard>
      <h1 className="is-size-3">Welcome to the admin panel!</h1>
      <h3 className="is-size-5 mt-3">Hope you have good news!</h3>
    </Dashboard>
  );
};

export default Main;
