import React, { useContext, useEffect } from "react";
import "./Information.css";
import { Link } from "react-router-dom";
import {
  BsFillCapslockFill,
  BsFillPersonPlusFill,
  BsChatDots,
} from "react-icons/bs";
import { AuthContext } from "../../../context/context";

const Information = () => {
  const avatarUrl =
    "https://st3.depositphotos.com/19428878/37071/v/450/depositphotos_370714622-stock-illustration-businessman-icon-vector-male-avatar.jpg";
  const { userId, getProfileInfo, profilePhoto, users, news, comments } =
    useContext(AuthContext);

  // useEffect(() => {
  //   getProfileInfo();
  // }, []);
  // if put getProfileInfo() in a useEffect here, whenever all sub-components in the sidebar renders
  // the useEffect triggers and getProfileInfo() will be rendered which is not optimal!
  // instead, I put getProfileInfo() in useEffect in the 'context' and in the 'login'

  return (
    <div className="information">

    </div>
  );
};

export default Information;
