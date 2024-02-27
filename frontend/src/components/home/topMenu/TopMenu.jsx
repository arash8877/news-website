import React from "react";
import "./TopMenu.css";
import { BsFillTelephoneFill, BsReception4 } from "react-icons/bs";

const TopMenu = () => {
  return (
    <>
      <div className="top-menu has-background-black py-2">
        <div className="container">
          <div className="columns">
            <div className="column is-two-thirds is-flex is-justify-content-start">
              <span className="has-text-white is-flex is-align-items-center">
                <BsReception4 className="mr-2 has-text-danger" /> Contact us:
                arash@gmail.com
              </span>
            </div>
            <div className="column is-one-third is-flex is-justify-content-end">
              <span className="has-text-white is-flex is-align-items-center is-size-5">
                <BsFillTelephoneFill className="mr-2" /> +45 1122 3344
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="home-page-logo pt-3">
        <div className="container">
          <div className="columns ">
            <div className="column is-one-third is-justify-content-flex-start	 logo">
              <img
                src="https://img.freepik.com/free-photo/3d-rendering-illustration-letter-blocks-forming-word-news-white-background_181624-60840.jpg?w=1380&t=st=1698825775~exp=1698826375~hmac=adb8bea5716fa26f2958dfa1a54bf7e7f42bcb37201ff3f5e39caf9c3b2ce0bd"
                alt="logo"
              />
            </div>
            <div className="column is-two-thirds is-flex is-justify-content-flex-end	 ads">
              <img
              src="https://img.freepik.com/free-vector/corporate-web-banner-design_1409-968.jpg?w=1800&t=st=1709045229~exp=1709045829~hmac=e44928c49e32e370989a9e3fdb5cfe494aa76b2c542e06dc35b46983bd9921ad"
                alt="add"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopMenu;
