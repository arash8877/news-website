import React from "react";
import "./HomeWrapper.css";

const HomeWrapper = () => {
  return (
    <div className="home-wrapper">
      <div className="container">
        <div className="columns is-flex-widescreen is-block-tablet is-align-items-start">
          <div className="column is-one-quarter-widescreen is-full-desktop">
            <div className="left-side-post">
            {loadingLastNews ? (
                <div className="left-side-top has-text-centered mt-6">
                  <Loader />
                </div>
              ) : (
                <>
                  {lastNews.map((item) => {
                    return (
                      <div className="left-side-top" key={item.id}>
                        <div className="left-side-img">
                          <div className="overlay"></div>
                          <img
                            src={item.url}
                            alt=""
                          />
                        </div>
                        <div className="post-info">
                          <div className="post-cat">
                            <span>{item.category.name}</span>
                          </div>
                          <div className="post-title">{item.title}</div>
                          <div className="post-date">{item.createdAt}</div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
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