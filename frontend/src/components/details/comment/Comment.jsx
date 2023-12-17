import React, { useState } from "react";

const Comment = () => {
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");

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
