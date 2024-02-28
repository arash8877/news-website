import React from "react";
import TopMenu from "../components/home/topMenu/TopMenu";
import Navbar from "../components/home/navbar/Navbar";
import HomeWrapper from "../components/home/home-wrapper/HomeWrapper";
import PopularNews from "../components/home/popular-news/PopularNews";
import WhatNews from "../components/home/what-news/WhatNews";

const HomePage = () => {
  return (
    <div className="wrapper">
      <TopMenu />
      <Navbar />
      <HomeWrapper />
      <WhatNews/>
      <PopularNews />
      <footer />
    </div>
  );
};

export default HomePage;
