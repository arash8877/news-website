import React from "react";
import "./Sidebar.css";
import { useParams } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const Sidebar = () => {
  const { id } = useParams();

  const shareUrl = `http://localhost:3000/details/${id}`;

  return (
    <div className="sidebar">
      <div className="social-media has-background-white p-5">
        <h1 className="is-size-6 has-text-weight-bold mb-4">Share</h1>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon round={true} size={40} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon round={true} size={40} />
        </TwitterShareButton>
      </div>
      <div className="details-ads has-text-centered mt-5">
        <img src="https://www.bizadmark.com/wp-content/uploads/2021/08/online-print-ads.jpg" width='250'/>
      </div>
    </div>
  );
};

export default Sidebar;