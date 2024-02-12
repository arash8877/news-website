import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import { Link } from "react-router-dom";
import "./news.css";
import { useContext } from "react";
import { AuthContext } from "../../../context/context";

const ViewNews = () => {
  const { news, handleNews, deleteNews } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const handleId = (id) => {
    setId(id);
  };

  useEffect(() => {
    handleNews();
  }, []);

  return (
    <Dashboard>

    </Dashboard>
  );
};

export default ViewNews;


