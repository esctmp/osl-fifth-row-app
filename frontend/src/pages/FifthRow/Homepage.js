import React from "react";
import logo_short from "../../assets/images/logo-short.png";
import data from "../../components/HomepageData/Data.json";
import "./Homepage.css";

const Homepage = () => {
  const user_id = "3";

  const user = data.find((item) => item.user_id === user_id);
  const name = user ? user.name : "";  // extract name, otherwise empty string

  return (
    <div>
      <div className="rectangle">
        <Logo />
        <div className="welcome">
          <label htmlFor="welcome">WELCOME</label>
        </div>
        <div className="fifthRow">
          <label htmlFor="fifthRow">{name}</label>
        </div>
        <InformationBox />
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="imageContainer">
      <img src={logo_short} alt="Logo" />
    </div>
  )
}

const InformationBox = () => {
  const user_id = "3";

  const user = data.find((item) => item.user_id === user_id);
  const count = user ? user.outstanding_epf : "";  // extract outstanding_epf count, otherwise empty string
  return (
    <div className="informationBox">
      <p className="informationText">You have {count} outstanding forms to review.</p>
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

// const SidebySideBoxes = () => {
//   return (
//     <div className="sidecontainer">
//       <ClubDetailsBox />
//       <RemainingBudgetBox />
//     </div>
//   )
// }

export default Homepage;