import React from "react";
import "./PopularNews.css";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";

const PopularNews = () => {
  return (
    <div className="container mt-6">
      <div className="columns">
        <div className="column is-four-fifths has-background-white p-4">
          <div className="popular mb-5">
            <h1>Popular News</h1>
          </div>
          <div className="columns">
            <div className="column popular-news">
              <div className="popular-img is-relative">
                <Link to="/">
                  <img
                    src="https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="is-fullwidth popular-image"
                  />
                </Link>
                <div className="num-views">
                  <span>
                    167
                    <BsEye />
                  </span>
                </div>
              </div>
              <div className="popular-title">
                <h6 className="is-flex has-text-weight-bold is-size-5">
                  <Link to="/">Title</Link>
                </h6>
              </div>
              <div className="author mt-4">
                <span className="is-size-6 has-text-grey mr-2">16-11-2023</span>
                <span className="is-size-6 has-text-grey ml-2">Arash</span>
              </div>
            </div>
            <div className="column popular-news">
              <div className="popular-img is-relative">
                <Link to="/">
                  <img
                    src="https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="is-fullwidth popular-image"
                  />
                </Link>
                <div className="num-views">
                  <span>
                    167
                    <BsEye />
                  </span>
                </div>
              </div>
              <div className="popular-title">
                <h6 className="is-flex has-text-weight-bold is-size-5">
                  <Link to="/">Title</Link>
                </h6>
              </div>
              <div className="author mt-4">
                <span className="is-size-6 has-text-grey mr-2">16-11-2023</span>
                <span className="is-size-6 has-text-grey ml-2">Arash</span>
              </div>
            </div>
            <div className="column popular-news">
              <div className="popular-img is-relative">
                <Link to="/">
                  <img
                    src="https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="is-fullwidth popular-image"
                  />
                </Link>
                <div className="num-views">
                  <span>
                    167
                    <BsEye />
                  </span>
                </div>
              </div>
              <div className="popular-title">
                <h6 className="is-flex has-text-weight-bold is-size-5">
                  <Link to="/">Title</Link>
                </h6>
              </div>
              <div className="author mt-4">
                <span className="is-size-6 has-text-grey mr-2">16-11-2023</span>
                <span className="is-size-6 has-text-grey ml-2">Arash</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularNews;