import React, { useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./WhatNews.css";


const WhatNews = () => {
  const { category, loadingCatPost, news,LoadCatPost } = useContext(HomeContext);
  const cat = useLocation().search
  useEffect(() => {
    LoadCatPost()
  }, [cat]);

  
  return (
    <div id="whats-news" className="py-5">
      <div className="container">
        <div className="columns is-flex-widescreen is-block-tablet">
          <div className="column is-flex is-one-quarter-widescreen is-justify-content-center">
            <img src={sendNews} className="send-news" alt="" />
          </div>
          <div className="column is-three-quarters-widescreen is-justify-content-center">
            <div className="whats-news has-background-white p-5">
              <div className="whats-news-title is-flex is-justify-content-space-between is-align-items-center">
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

                <div className="whats-news-name">
                  <h1 className="is-size-2 title">What's up</h1>
                </div>
              </div>

              {loadingCatPost ? (
                <div className="has-text-centered">
                  <Loader />
                </div>
              ) : (
                <div className="whats-news-post mt-6">
                  {
                    news && news?.map((post) => {
                      return (
                        <div className="whats-news-post-item" key={post.id}>
                        <div className="whats-news-post-item-img">
                          <Link state={post} to={`/detail/${post.id}`}>
                            <img src={post.url} alt="" />
                          </Link>
                        </div>
                        <div className="whats-news-post-item-description">
                        <Link state={post} to={`/detail/${post.id}`}>
                            <p>
                             {post.desc}
                            </p>
                          </Link>
                          <div className="whats-news-post-item-date">
                            <p>
                              {moment(post.createdAt).locale("fs").format("YYYY-MM-DD")}
                            </p>
                          </div>
                        </div>
                      </div>
                      )
                    })
                  }
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
