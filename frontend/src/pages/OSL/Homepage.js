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

// const ClubDetailsBox = () => {
//   return (
//     <div className="bottomTwoBox">
//       <h2 className="clubDetailsBox">Club Details</h2>
//     </div>
//   )
// }

// const RemainingBudgetBox = () => {
//   return (
//     <div className="bottomTwoBox">
//       <h2 className="remainingBudgetBox">Remaining Budget</h2>
//       <h2 className="remainingAmount"> $345 </h2>
//     </div>
//   )
// }

const InformationBox = () => {
  return (
    <div className="informationBox">
      <p className="informationText">There are 3 forms for your approval.</p>
    </div>
  )
}

// const SidebySideBoxes = () => {
//   return (
//     <div className="container">
//       <ClubDetailsBox />
//       <RemainingBudgetBox />
//     </div>
//   )
// }

export default Homepage;