import React from "react";
import "./Content.css";
import Comment from "../comment/Comment";
import ViewComment from "../comment/ViewComment";

const Content = ({ data }) => {
  return (
    <>
      <div className="details-content">
        <div className="details-image">
          <img src={data.url} />
        </div>
        <div className="details-title">
          <h1 className="title mt-5">{data.tile}</h1>
        </div>
        <div className="details-description">
          <p className="description mt-5">{data.desc}</p>
        </div>
        <div className="comment">
          <Comment />
        </div>
      </div>
      <ViewComment />
    </>
  );
};

export default Content;
