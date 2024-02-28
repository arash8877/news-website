import React, { useContext, useEffect } from "react";
import Comment from "../comment/Comment";
import "./Content.css";
import { useParams } from "react-router-dom";
import HomeContext from "../../../context/homeContext";


const Content = ({ data }) => {
  const {getSingleComment,LoadView} = useContext(HomeContext)
  const {id} = useParams()

  useEffect(()=> {
    getSingleComment(id)
    LoadView(id)
  }, [])


  return (
    <div className="content-detail">
      <div className="detail-image">
        <img src={data.url} alt="" />
      </div>
      <div className="detail-title">
        <h1 className="title mt-5">{data.title}</h1>
      </div>
      <div className="detail-description">
        <p className="description mt-5">{data.desc}</p>
      </div>

      <div className="author">
        <div className="box p-5 mt-6">
          <article className="media is-align-items-center is-flex">
               <div className="title is-size-6">Author:</div>
            <div className="media-left">
              <figure className="image is-64x64">
                <img src={data?.user?.url} alt="Image" />
              </figure>
            </div>
            <div className="media-content pr-3">
              <div className="content">
                <p>{data?.user?.name}</p>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="comment">
        <Comment />
      </div>
    </div>
  );
};

export default Content;
