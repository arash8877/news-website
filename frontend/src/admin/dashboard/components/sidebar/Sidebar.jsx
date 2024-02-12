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
      <div className="logo mb-5 has-text-centered">
        <img
          src="https://img.freepik.com/free-photo/3d-rendering-illustration-letter-blocks-forming-word-news-white-background_181624-60840.jpg?w=1380&t=st=1698825775~exp=1698826375~hmac=adb8bea5716fa26f2958dfa1a54bf7e7f42bcb37201ff3f5e39caf9c3b2ce0bd"
          alt="logo"
        />
      </div>

    </div>
  );
};

export default Sidebar;
