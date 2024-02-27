import React from 'react';
import './TopMenu.css';
import { BsFillTelephoneFill, BsReception4 } from "react-icons/bs";

const TopMenu = () => {
  return (
        <>
      <div className="top-menu has-background-black py-2">
        <div className="container">
          <div className="columns">
            <div className="column is-two-thirds is-flex is-justify-content-start">
              <span className="has-text-white is-flex is-align-items-center">
                <BsReception4 className="ml-2 has-text-danger" /> Contact us:
                arash@gmail.com
              </span>
            </div>
            <div className="column is-one-third is-flex is-justify-content-end">
              <span className="has-text-white is-flex is-align-items-center is-size-5">
                <BsFillTelephoneFill className="ml-2" /> +45 1122 3344
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="home-page-logo pt-3">
           <div className="container">
                <div className="columns">
                     <div className="column is-one-third is-flex is-justify-content-end">
                         <img src="https://img.freepik.com/free-photo/3d-rendering-illustration-letter-blocks-forming-word-news-white-background_181624-60840.jpg?w=1380&t=st=1698825775~exp=1698826375~hmac=adb8bea5716fa26f2958dfa1a54bf7e7f42bcb37201ff3f5e39caf9c3b2ce0bd" alt="logo" />
                     </div>
                     <div className="column is-two-thirds ads">
                         <img src="https://www.shakeout.org/2008/downloads/ShakeOut_BannerAds_JoinUs_160x600_v2.gif" alt="add" />
                     </div>
                </div>
           </div>
      </div>
    </>
  )
}

export default TopMenu