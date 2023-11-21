import React from "react";
import TopMenu from "../components/home/topMenu/TopMenu";
import NavBar from "../components/home/navBar/NavBar";
import Content from "../components/details/content/Content";
import Sidebar from "../components/details/sideBar/Sidebar";

const Details = () => {
  return (
    <>
      <TopMenu />
      <NavBar />
      <div className="post-details mt-6">
        <div className="container">
          <div className="columns">
            <div className="column is-two-thirds">
                <Content/>
            </div>
            <div className="column is-one-third">
                <Sidebar/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;