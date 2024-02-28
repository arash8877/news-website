import React from "react";
import TopMenu from "../components/home/topMenu/TopMenu";
import Navbar from "../components/home/navbar/Navbar";
import Content from "../components/detail/content/Content";
import SideLeft from "../components/detail/sideLeft/SideLeft";

const Detail = () => {
  return (
    <>
      <TopMenu />
      <Navbar />
      <div className="detail-post mt-6">
        <div className="container">
          <div className="columns">
            <div className="column is-two-thirds">
              <Content data={state} />
            </div>
            <div className="column is-one-third">
              <SideLeft />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
