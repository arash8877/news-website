import React, { useContext } from "react";
import { BSArrowReturnLeft, BsArrowReturnLeft } from "react-icons/bs";
import { HomeContext } from "../../../context/context";

const ViewComment = () => {
  const { newsComments } = useContext(HomeContext);


  return (
  <div className="comment-view mt-5">
      {newsComments?.map((comment) => (
        <>
          {comment.isActive ? (
            <div className="box" key={comment.id}>
              <div className="name is-size-5">{comment.id}</div>
              <div className="subject has-text-grey">
                <div className="pl-2 mt-2">
                  <BsArrowReturnLeft />
                </div>
                <span className="pl-4 pt-1 is-size-6">{comment.subject}</span>
              </div>
              <div className="desc pt-4">
                <p>{comment.description}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ))}
    </div>
  );
};

export default ViewComment;