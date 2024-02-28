import React from "react";
import TopMenu from "../components/home/topMenu/TopMenu";
import Navbar from "../components/home/navbar/Navbar";
import Footer from "../components/home/footer/Footer";


const About = () => {

  
  return (
    <>
      <TopMenu />
      <Navbar />
      <div className="about pt-6">
        <div className="container">
          <div className="columns">
            <div className="column">
              <h1 className="title mb-6">Get know us more</h1>
              <p className="is-size-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem
              </p>
            </div>
            <div className="column">
              <img src="https://images.unsplash.com/photo-1607004468138-e7e23ea26947?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
