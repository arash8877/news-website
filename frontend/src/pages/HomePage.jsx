import React from "react";
import TopMenu from "../components/home/topMenu/TopMenu";
import NavBar from "../components/home/topMenu/navBar/NavBar";
import HomeWrapper from "../components/home/home-wrapper/HomeWrapper";
import WhatNews from "../components/home/whatNews/WhatNews";

const HomePage = () => {
  return (
    <div className="wrapper">
      <TopMenu />
      <NavBar />
      <HomeWrapper />
      <WhatNews />
    </div>
  );
};

export default HomePage;
