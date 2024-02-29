import React from 'react'
import "./SideLeft.css"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import {useParams} from "react-router-dom"


const SideLeft = () => {

  const {id} = useParams()
  const shareUrl = `http://www.localhost:3000/detail/${id}`;

  return (
    <div className="side-left">
      <div className="social-media has-background-white p-5">
        <h1 className='is-size-6 has-text-weight-bold mb-4'>Share</h1>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon round={true} size={40} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon round={true} size={40}  />
        </TwitterShareButton>
      </div>
      <div className="detail-ads has-text-centered mt-5">
        <img src="https://img.freepik.com/free-psd/business-promotion-corporate-instagram-story-template_120329-1473.jpg?t=st=1709137494~exp=1709141094~hmac=3ad623355b350959c914039056aae23317a237fc85692ff58308c5da6295bc5d&w=740" width="250" alt="" />
      </div>
    </div>
  )
}

export default SideLeft