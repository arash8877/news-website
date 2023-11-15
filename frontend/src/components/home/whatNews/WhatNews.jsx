import React from "react";
import { NavLink } from "react-router-dom";

const WhatNews = () => {
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
            <div className="what-news has-text-white p-5">
              <div className="what-news-title is-flex is-justify-content-space-between is-align-items-center">
                <div className="what-news-nav">
                  <ul className="is-flex">
                    <li className="mr-5 has-text-weight-bold">
                      <NavLink to="/">All</NavLink>
                    </li>
                    <li className="mr-5 has-text-weight-bold">
                      <NavLink to="/">Fun</NavLink>
                    </li>
                    <li className="mr-5 has-text-weight-bold">
                      <NavLink to="/">Social</NavLink>
                    </li>
                  </ul>
                </div>

                <div className="what-news-name">
                    <h1 className="is-size-2 title">Whats up</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatNews;