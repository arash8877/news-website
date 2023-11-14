import React from 'react'
import TopMenu from '../components/home/topMenu/TopMenu';
import NavBar from '../components/home/topMenu/navBar/NavBar';
import HomeWrapper from '../components/home/home-wrapper/HomeWrapper';

const HomePage = () => {
  return (
    <div className="wrapper">
        <TopMenu/>
        <NavBar/>
        <HomeWrapper/>
    </div>
  )
}

export default HomePage