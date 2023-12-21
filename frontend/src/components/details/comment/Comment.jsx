import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { HomeContext } from "../../../context/context";

const Comment = () => {
  const { createComment } = useContext(HomeContext);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");



  const reset = () => {
    setName("");
    setEmail("");
    setReview("");
    setSubject("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      newsId,
      review,
      name,
      email,
      subject,
    };
    createComment(data);
  };

  const { id } = useParams();
  const newsId = id;

  return (
    <div className="comment-section mt-6 mb-6">
      <form>
        <div className="field">
          <textarea
            className="textarea"
            placeholder="Type your comment"
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <div className="columns">
          <div className="column">
            <input
              type="text"
              className="input"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="column">
            <input
              type="email"
              className="input"
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <input
            type="text"
            className="input"
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="field">
          <button className="button has-background-danger is-fullwidth mt-5 has-text-white">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comment;
