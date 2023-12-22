import React from "react";
import NotFound from "./NotFound.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../admin/context/context";

const NotFound = () => {
  const { userId } = useContext(AuthContext);
  return (
        <div className="not-loggedIn is-flex is-align-items-center is-justify-content-center">
      <div className="container">
        <div className="column has-text-centered">
 
        </div>
      </div>
    </div>
  );
};

export default NotFound;
