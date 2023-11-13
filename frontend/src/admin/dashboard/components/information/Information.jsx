import React, {useContext} from "react";
import "./information.css";
import { Link } from "react-router-dom";
import {
  BsFillCapslockFill,
  BsFillPersonPlusFill,
  BsChatDots,
} from "react-icons/bs";
import { AuthContext } from "../../../context/context";


const Information = () => {
  const {userId} = useContext(AuthContext);


  return (
    <div className="information">
      <div className="view-web is-flex is-align-items-center is-justify-content-space-between mb-5">
        <div className="view-webpage">
          <a href="/" className="button has-background-success has-text-white">
            View Website
          </a>
        </div>
        <div className="view-profile">
          <span>
            <Link to={`/update-profile/${userId}`}>
              <img
                className="image profile-photo"
                src="https://st3.depositphotos.com/19428878/37071/v/450/depositphotos_370714622-stock-illustration-businessman-icon-vector-male-avatar.jpg"
                alt="avatar"
              />
            </Link>
          </span>
        </div>
      </div>
      <div className="info">
        <div className="info-item">
          <BsFillCapslockFill />
          <h4>News</h4>
          <span>25</span>
        </div>
        <div className="info-item">
          <BsFillPersonPlusFill />
          <h4>Users</h4>
          <span>8</span>
        </div>
        <div className="info-item">
          <BsChatDots />
          <h4>Comments</h4>
          <span>66</span>
        </div>
      </div>
    </div>
  );
};

export default Information;