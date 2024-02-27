import React from "react";
import TopMenu from "../components/home/topMenu/TopMenu";
import Navbar from "../components/home/navbar/Navbar";
import HomeWrapper from "../components/home/home-wrapper/HomeWrapper";

const HomePage = () => {
  return (
    <div className="wrapper">
      <TopMenu />
      <Navbar />
      <HomeWrapper />
    </div>
  );
};

export default HomePage;
