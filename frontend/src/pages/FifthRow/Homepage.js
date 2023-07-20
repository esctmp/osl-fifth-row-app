import React, { useContext } from "react";
import logo_short from "../../assets/images/logo-short.png";
import "./Homepage.css";
import {UserID} from "../../routes/UserID"
const Homepage = () => {
  const {userId,setUserId} = useContext(UserID);
  return (
    <div>
      <div className="rectangle">
        <Logo />
        <div className="welcome">
          <label htmlFor="welcome">Welcome</label>
        </div>
        <div className="fifthRow">
          <label htmlFor="fifthRow">Badminton</label>
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
  return (
    <div className="informationBox">
      <p className="informationText">You have 3 outstanding forms to review.</p>
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