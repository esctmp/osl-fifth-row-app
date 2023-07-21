import React, { useContext, useEffect, useState } from "react";
import logo_short from "../../assets/images/logo-short.png";
//import data from "../../components/HomepageData/Data.json";
import axios from "axios";
import { UserID } from "../../routes/UserID";
import "./Homepage.css";



const Homepage = () => {
  const[FRname,setFRname] = useState(null);
  const[EPFcount, setEPFcount] = useState(null);
  const {userId,setUserId} = useContext(UserID);
  console.log(userId);
  useEffect(()=>
  axios.get(`http://localhost:3000/users/getEXCO?user_id=${userId}`).then(function(response){
    // console.log(response.data[0].name);
    // console.log(response.data[0].outstanding_epf);
    setEPFcount(response.data[0].outstanding_epf);
    setFRname(response.data[0].name);
    }).catch(error =>{
        console.error("Error fetching EXCO: ",error);
    }))
 

  return (
    <div>
      <div className="rectangle">
        <Logo />
        <div className="welcome">
          <label htmlFor="welcome">Welcome</label>
        </div>
        <div className="fifthRow">
          <label htmlFor="fifthRow">{FRname}</label>
        </div>
        <div className="informationBox">
          <p className="informationText">You have {EPFcount} outstanding forms to review.</p>
        </div>
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

// const InformationBox = () => {
  
//   return (
//     <div className="informationBox">
//       <p className="informationText">You have {EPFcount} outstanding forms to review.</p>
//     </div>
//   )
// }

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