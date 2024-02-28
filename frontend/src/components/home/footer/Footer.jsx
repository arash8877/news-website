import React from "react";
// import travel from "../../../assets/images/traveling.jpg";
// import newsImg from "../../../assets/images/1.jpeg";
// import logo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";
import "./Footer.css";


const Footer = () => {
  return (
    <footer className="mt-6 pt-6 pb-6">
      <div className="container pt-6 pb-6">
        <div className="columns">
          <div className="column is-one-third">
            <img src="" width="270" alt="" />
          </div>
          <div className="column is-one-third">
            <h1 className="subtitle has-text-white mb-5">Popular News</h1>
            <ul>
              <li className="mt-4">
                <div className="post-footer is-flex is-align-items-center">
                  <div className="post-footer-image">
                    <Link to="/">
                      <img src="" alt="" />
                    </Link>
                  </div>
                  <div className="post-footer-title pr-3">
                    <Link ti="/">
                      <h1>Title</h1>
                    </Link>
                    <h1 className="post-footer-name">Arash</h1>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="column is-one-third">
            <div className="footer-logo">
              <img src="" alt="" />
            </div>
            <div className="footer-desc pt-5">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
              </p>
            </div>
            <div className="footer-address pt-6">
              <p>2200 Copenhagen-Walking street</p>
            </div>
            <div className="footer-phone pt-6">
              <p>Mobil: +45 1122 3344</p>
            </div>
          </div>
        </div>
        <div className="columns mt-6 has-text-centered is-flex is-justify-content-center">
          <p>All right reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
