import React, { useEffect, useContext } from "react";
import Loader from "../../loading/Loader";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./WhatNews.css";
import { HomeContext } from "../../../context/homeContext";

const WhatNews = () => {
  const { category, loadingCategory, newsCategory, LoadCatPost } =
    useContext(HomeContext);

  const cat = useLocation().search;

  useEffect(() => {
    LoadCatPost();
  }, [cat]);

  return (
    <div id="whats-news" className="py-5">
      <div className="container">
        <div className="columns is-flex-widescreen is-block-tablet">
          <div className="column is-flex is-one-quarter-widescreen is-justify-content-center">
            <img
              src="https://img.freepik.com/free-photo/young-happy-businesswoman-reading-daily-newspaper-drinking-coffee-after-work-cafe_637285-234.jpg?t=st=1709462380~exp=1709465980~hmac=d40b69ff7663a5adef1475091ea4452884d1ad0184bc4fc34952056d2a589ee5&w=740"
              className="send-news"
              alt=""
            />
          </div>
          <div className="column is-three-quarters-widescreen is-justify-content-center">
            <div className="whats-news has-background-white p-5">
              <div className="whats-news-title is-flex is-justify-content-space-between is-align-items-center">
                <div className="whats-news-name">
                  <h1 className="is-size-2 title">What's up</h1>
                </div>
                <div className="whats-news-nav">
                  <ul className="is-flex">
                    <li className="ml-5 has-text-weight-bold">
                      <NavLink to="/">All</NavLink>
                    </li>
                    {category &&
                      category?.map((cat) => {
                        return (
                          <li
                            className="ml-5 has-text-weight-bold"
                            key={cat.id}
                          >
                            <NavLink to={`/?cat=${cat.id}`}>{cat.name}</NavLink>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>

              {loadingCategory ? (
                <div className="has-text-centered">
                  <Loader />
                </div>
              ) : (
                <div className="whats-news-post mt-6">
                  {newsCategory &&
                    newsCategory?.map((post) => {
                      return (
                        <div className="whats-news-post-item" key={post.id}>
                          <div className="whats-news-post-item-img">
                            <Link state={post} to={`/detail/${post.id}`}>
                              <img src={post.url} alt="" />
                            </Link>
                          </div>
                          <div className="whats-news-post-item-description">
                            <Link state={post} to={`/detail/${post.id}`}>
                              <p>{post.desc}</p>
                            </Link>
                            <div className="whats-news-post-item-date">
                              <p>
                                {new Date(post.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatNews;
