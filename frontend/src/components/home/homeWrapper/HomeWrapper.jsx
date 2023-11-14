import React from "react";
import "./HomeWrapper.css";

const HomeWrapper = () => {
  return (
    <div className="home-wrapper">
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="right-side-post">
              <div className="right-side-top">
                <div className="right-side-img">
                  <div className="overlay">
                    <img src="https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?size=626&ext=jpg&ga=GA1.1.572310632.1696408268&semt=sph" alt="" />
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
          </div>
          <div className="column">
            <div className="post-left-side">
                <video src="https://youtu.be/SMxx9XEF6m0" controls></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWrapper;