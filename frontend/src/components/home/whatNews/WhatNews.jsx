import React, { useContext, useEffect } from "react";
import "./WhatNews.css";
import { Link, NavLink } from "react-router-dom";
import { HomeContext } from "../../../context/context";
import Loader from "../../loading/Loader";

const WhatNews = () => {
  const { category, loadingCatPost, news, loadCatPost } =
    useContext(HomeContext);

  useEffect(() => {
    loadCatPost();
  }, []);

  return (
    <div id="what-news" className="py-5">
      <div className="container">
        <div className="columns is-flex-widescreen is-block-tablet">
          <div className="column is-flex is-one-quarter-widescreen is-justify-content-center">
            <img
              src="https://img.freepik.com/free-photo/young-woman-yellow-warm-sweater-with-megaphone-speaker-screaming-left-pointing-index-finger_343596-7143.jpg?w=1380&t=st=1700056060~exp=1700056660~hmac=78b5306e703b690c76eb3f959dbef5ba39ff75520bc7634711a0fce90850848d"
              className="send-news"
            />
          </div>
          <div className="column is-three-quarters is-justify-content-center">
            <div className="what-news has-background-white p-5">
              <div className="what-news-title is-flex is-justify-content-space-between is-align-items-center">
                <div className="what-news-nav">
                  <ul className="is-flex">
                    <li className="mr-5 has-text-weight-bold">
                      <NavLink to="/">All</NavLink>
                    </li>
                    {category &&
                      category?.map((cat) => {
                        return (
                          <li
                            className="mr-5 has-text-weight-bold"
                            key={cat.id}
                          >
                            <NavLink to="/">{cat.name}</NavLink>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className="what-news-name">
                  <h1 className="is-size-2 title">Whats up</h1>
                </div>
              </div>
              {loadingCatPost ? (
                <div className="has-text-centered">
                  <Loader />
                </div>
              ) : (
                <div className="what-news-post mt-6">
                  {news &&
                    news?.map((post) => {
                      return (
                        <div className="what-news-post-item" key={post.id}>
                          <div className="what-news-post-item-img">
                            <Link to="/">
                              <img src={post.url} />
                            </Link>
                          </div>
                          <div className="what-news-post-item-description">
                            <Link>
                              <p>{post.desc}</p>
                            </Link>
                            <div className="what-news-post-item-date">
                              <p>{post.createdAt}</p>
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

{
  /* 

category && category?HomeContext.map((cat) => {
                        return (
                          <li className="mr-5 has-text-weight-bold" key={cat.id}>
                        <NavLink to="/">{cat.name}</NavLink>
                      </li>
                        )
                       }) */
}
