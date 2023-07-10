import React from "react";
import test_logo from "../../assets/images/logo-short.png";
import "./Homepage.css";

const Homepage = () => {

  return (
    <div>
      <div className="rectangle">
        <Logo />
        <div className="welcome">
          <label htmlFor="welcome">WELCOME</label>
        </div>
        <div className="fifthRow">
          <label htmlFor="fifthRow">Badminton</label>
        </div>
        <SidebySideBoxes />
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

const ClubDetailsBox = () => {
  return (
    <div className="bottomTwoBox">
      <h2 className="clubDetailsBox">Club Details</h2>
    </div>
  )
}

const RemainingBudgetBox = () => {
  return (
    <div className="bottomTwoBox">
      <h2 className="remainingBudgetBox">Remaining Budget</h2>
      <h2 className="remainingAmount"> $345 </h2>
    </div>
  )
}

const SidebySideBoxes = () => {
  return (
    <div className="sidecontainer">
      <ClubDetailsBox />
      <RemainingBudgetBox />
    </div>
  )
}

export default Homepage;