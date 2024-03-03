import React, { useContext, useEffect } from "react";
import "./Information.css";
import { Link } from "react-router-dom";
import {
  BsFillCapslockFill,
  BsFillPersonPlusFill,
  BsChatDots,
} from "react-icons/bs";
import { AuthContext } from "../../../context/context"; 

const Information = () => {
  const avatarUrl =
    "https://st3.depositphotos.com/19428878/37071/v/450/depositphotos_370714622-stock-illustration-businessman-icon-vector-male-avatar.jpg";
  const { userId, getProfileInfo, profilePhoto, users, news, comments } =
    useContext(AuthContext);

  // useEffect(() => {
  //   getProfileInfo();
  // }, []);
  // if put getProfileInfo() in a useEffect here, whenever all sub-components in the sidebar renders
  // the useEffect triggers and getProfileInfo() will be rendered which is not optimal!
  // instead, I put getProfileInfo() in 1-useEffect in the 'context' and in 2-'login'

  return (
    <div className="information">
      <div className="view-web is-flex is-align-items-center is-justify-content-space-between mb-5">
        <div className="view-webpage">
          <a href="/" className="button has-background-success has-text-white">
            View Website
          </a>
        </div>
        <div className="view-profile">
          <span>
            <Link to={`/update-profile/${userId}`}>
              <img
                className="image profile-photo"
                src={profilePhoto ? profilePhoto : avatarUrl}
                alt="profile-photo"
              />
            </Link>
          </span>
        </div>
      </div>
      <div className="info">
        <div className="info-item">
          <BsFillCapslockFill />
          <h4>News</h4>
          <span>{news.length}</span>
        </div>
        <div className="info-item">
          <BsFillPersonPlusFill />
          <h4>Users</h4>
          <span>{users.length}</span>
        </div>
        <div className="info-item">
          <BsChatDots />
          <h4>Comments</h4>
          <span>{comments.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Information;
