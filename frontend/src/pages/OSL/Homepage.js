import React from "react";
import test_logo from "../../assets/images/logo-short.png";
import "./Homepage.css";

//This is homepage
const Homepage = () => {

  return (
    <div>
      <div className="rectangle">
        <Logo />
        <div className="welcome">
          <label htmlFor="welcome">WELCOME</label>
        </div>
        <div className="oslPersonnel">
          <label htmlFor="oslPersonnel">Woon Yang</label>
        </div>
        <InformationBox />
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="imageContainer">
      <img src={test_logo} alt="Logo" />
    </div>
  )
}

const InformationBox = () => {
  return (
    <div className="informationBox">
      <p className="informationText">There are 3 forms for your approval.</p>
    </div>
  )
}



export default Homepage;