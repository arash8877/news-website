import React, { useContext } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../../context/context";

const Sidebar = () => {
  const [showNews, setShowNews] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
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
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <span onClick={() => setShowNews(!showNews)}>News</span>

          {showNews && (
            <ul>
              <li>
                <Link to="/add-news">Add News</Link>
              </li>
              <li>
                <Link to="/view-news">View News</Link>
              </li>
            </ul>
          )}
        </li>


        <li>
          <span onClick={() => setShowCategories(!showCategories)}>Categories</span>

          {showCategories && (
            <ul>
              <li>
                <Link to="/add-news">Add Category</Link>
              </li>
              <li>
                <Link to="/view-category">View Categories</Link>
              </li>
            </ul>
          )}
        </li>




        {/* {admin ? (
          <>
            <li>
              <span onClick={() => setShowCategory(!showCategory)}>
                Categories
              </span>

              {showCategory && (
                <ul>
                  <li>
                    <Link to="/add-category">Add category</Link>
                  </li>
                  <li>
                    <Link to="/view-categories">View categories</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <span onClick={() => setShowVideo(!showVideo)}>Videos</span>

              {showVideo && (
                <ul>
                  <li>
                    <Link to="/add-video">Add video</Link>
                  </li>
                  <li>
                    <Link to="/view-videos">View videos</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <span onClick={() => setShowUsers(!showUsers)}>Users</span>

              {showUsers && (
                <ul>
                  <li>
                    <Link to="/add-user">Add user</Link>
                  </li>
                  <li>
                    <Link to="/view-users">View users</Link>
                  </li>
                </ul>
              )}
            </li>
          </>
        ) : (
          ""
        )}

        <li>
          <Link to="/comment">Comments</Link>
        </li>
        <li>
          <span onClick={logout}>Logout</span>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
