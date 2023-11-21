import React from "react";
import { BSArrowReturnLeft, BsArrowReturnLeft } from "react-icons/bs";

const ViewComment = () => {
  return (
    <div className="comment-view mt-5">
      <div className="box">
        <div className="name is-size-5">arash</div>
        <div className="subject has-text-grey">
          <div className="pl-2 mt-2">
            <BsArrowReturnLeft />
          </div>
          <span className="pl-4 pt-1 is-size-6">something....</span>
        </div>
        <div className="desc pt-4">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley.
          </p>
        </div>
      </div>
      <div className="box">
        <div className="name is-size-5">arash</div>
        <div className="subject has-text-grey">
          <div className="pl-2 mt-2">
            <BsArrowReturnLeft />
          </div>
          <span className="pl-4 pt-1 is-size-6">something....</span>
        </div>
        <div className="desc pt-4">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewComment;