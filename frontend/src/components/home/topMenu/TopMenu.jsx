import React from "react";
import './TopMenu.css';
import { BsFillTelephoneFill, BsReception4 } from "react-icons/bs";
const logoUrl = "https://img.freepik.com/free-photo/3d-rendering-illustration-letter-blocks-forming-word-news-white-background_181624-60840.jpg?w=1380&t=st=1699963573~exp=1699964173~hmac=11bbe2edbd1b30374efd4d1ddcaaa077587ddef106de92a2370085ac1768d9b4";
const adsUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHFqzTRjyeCtxKrU83lBp2P7UXHTIq-5SvWHSeWqM1MzyB1x0e4b5ZXpvwbPusiU7rtJU&usqp=CAU";



const TopMenu = () => {
  return (
    <>
      <div className="top-menu has-background-black py-2">
        <div className="container">
          <div className="columns">
            <div className="column is-two-thirds is-flex is-justify-content-start">
              <span className="has-text-white is-flex is-align-items-center">
                <BsReception4 className="mr-2 has-text-danger" /> connect:
                example@mail.com
              </span>
            </div>
            <div className="column is-one-third is-flex is-justify-content-end">
              <span className="has-text-white is-flex is-align-items-center is-size-5">
                <BsFillTelephoneFill className="mr-2" /> +45 12345678
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="home-page-logo pt-3">
        <div className="container">
          <div className="columns is-flex is-align-items-center is-justify-content-space-between">
            <div className="column is-one-fifth">
              <img src={logoUrl} alt="logo" />
            </div>
            <div className="column is-two-fifths ads">
              <img src={adsUrl} alt="ads" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopMenu;