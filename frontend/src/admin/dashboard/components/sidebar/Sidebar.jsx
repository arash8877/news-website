import React, { useContext } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../../context/context";

const Sidebar = () => {
  const [showNews, setShowNews] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const { logout, admin } = useContext(AuthContext);

  return (
    <div className="sidebar">

    </div>
  );
};

export default Sidebar;
