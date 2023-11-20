import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-6 pt-6 pb-6">
      <div className="container pt-6 pb-6">
        <div className="columns">
          <div className="column is-one-third">
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/travel-agency-advertising-holiday-giveaway-design-template-b3283fa3823a73c28cd17d78886d4632_screen.jpg?ts=1654766594"
              width="270"
            />
          </div>
          <div className="column is-one-third">
            <h1 className="subtitle has-text-white mb-5">Popular News</h1>
            <ul>
              <li className="mt-4">
                <div className="footer-post is-flex is-align-items-center">
                  <div className="footer-post-image">
                    <Link to="/">
                      <img src="https://images.unsplash.com/photo-1683009680116-b5c04463551d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    </Link>
                  </div>
                  <div className="footer-post-title pl-3">
                    <Link>
                      <h1>Title-test</h1>
                    </Link>
                    <h1 className="footer-post-name">Arash</h1>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="column is-one-third">
            <div className="footer-logo">
                <img src="https://img.freepik.com/free-photo/3d-rendering-illustration-letter-blocks-forming-word-news-white-background_181624-60840.jpg?w=1380&t=st=1699963573~exp=1699964173~hmac=11bbe2edbd1b30374efd4d1ddcaaa077587ddef106de92a2370085ac1768d9b4"/>
            </div>
            <div className="footer-desc pt-5">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
            <div className="footer-address pt-6">
                <address>Hvoedgade 35, 1th 2200 Copenhagen</address>
            </div>
            <div className="footer-phone pt-2">
                <address>Phone: +45 12345678</address>
            </div>
          </div>
        </div>
        <div className="columns mt-6 has-text-center is-flex is-justify-content-center">
          <p>Copyright @ 2023 Arash All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;