import React from "react";
import TopMenu from "../components/home/topMenu/TopMenu";
import NavBar from "../components/home/topMenu/navBar/NavBar";
import HomeWrapper from "../components/home/homeWrapper/HomeWrapper";
import WhatNews from "../components/home/whatNews/WhatNews";
import PopularNews from "../components/home/popular/PopularNews";
import Footer from "../components/home/footer/Footer";

const HomePage = () => {
  return (
    <div className="wrapper">
      <TopMenu />
      <NavBar />
      <HomeWrapper />
      <WhatNews />
      <PopularNews />
      <Footer />
    </div>
  );
};

export default HomePage;
