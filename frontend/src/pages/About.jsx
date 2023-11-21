import React from "react";
import TopMenu from "../components/home/topMenu/TopMenu";
import NavBar from "../components/home/navBar/NavBar";
import Footer from "../components/home/footer/Footer";

const About = () => {
  return (
    <>
      <TopMenu />
      <NavBar />
      <div className="about pt-6">
        <div className="container">
          <div className="columns">
            <div className="column">
              <h1 className="title mb-6">Get Know Us</h1>
              <p className="is-size-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </p>
            </div>
            <div className="column">
              <img src="https://img.freepik.com/free-vector/teamwork-concept-landing-page_52683-21300.jpg?w=826&t=st=1700561701~exp=1700562301~hmac=2f03f4823507d78f95b070e6d54527bf7b663f5a45ddfe02928372acfdbf974f" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;