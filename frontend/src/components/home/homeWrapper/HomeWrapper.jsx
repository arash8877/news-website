import React from "react";
import "./HomeWrapper.css";

const HomeWrapper = () => {
  return (
    <div className="home-wrapper">
      <div className="container">
        <div className="columns is-flex-widescreen is-block-tablet is-align-items-start">
          <div className="column is-one-quarter-widescreen is-full-desktop">
            <div className="left-side-post">
              <div className="left-side-top">
                <div className="left-side-img">
                  <div className="overlay"></div>
                  <img
                    src="https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?size=626&ext=jpg&ga=GA1.1.572310632.1696408268&semt=sph"
                    alt=""
                  />
                </div>
                <div className="post-info">
                  <div className="post-cat">
                    <span>test</span>
                  </div>
                  <div className="post-title">post title</div>
                  <div className="post-date">15.11.2023</div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-three-quarters is-full-tablet">
            <div className="post-right-side">
              <video
                src="https://youtu.be/SMxx9XEF6m0"
                controls
                width="100%"
                height="100%"
              ></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWrapper;