import React, {useContext} from "react";
import "./PopularNews.css";
import { HomeContext } from "../../../context/context";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";

const PopularNews = () => {
  const {loadingPopularNews, errorPopularNews, popularNews} = useContext(HomeContext);

  return (
    <div className="container mt-6">
      <div className="columns">
{
  loadingPopularNews && popularNews.pap()
}
      </div>
    </div>
  );
};

export default PopularNews;

