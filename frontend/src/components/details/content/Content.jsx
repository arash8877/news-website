import React from "react";
import "./Content.css";
import Comment from "../comment/Comment";
import ViewComment from "../comment/ViewComment";

const Content = () => {
  return (
    <>
      <div className="details-content">
        <div className="details-image">
          <img src="https://img.freepik.com/free-photo/host-night-show-broadcasts-fresh-footage-from-newsroom-offers-information-current-affairs-all-globe-worldwide-tv-program-media-correspondent-reporting-news_482257-72710.jpg?w=1380&t=st=1700572512~exp=1700573112~hmac=7bb3969627c691f4f5b86a3b086b5bb03fa1a62b3c74a25903b9b85cb2615814" />
        </div>
        <div className="details-title">
          <h1 className="title mt-5">Title test</h1>
        </div>
        <div className="details-description">
          <p className="description mt-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
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