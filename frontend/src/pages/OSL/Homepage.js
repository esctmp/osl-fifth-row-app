import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import test_logo from "../../assets/images/logo-short.png";
import { UserID } from "../../routes/UserID";
import "./Homepage.css";

//This is homepage
const Homepage = () => {

  const[FRname,setFRname] = useState("OSL User");
  const[EPFcount, setEPFcount] = useState("_");
  const {userId,setUserId} = useContext(UserID);
  console.log(userId);
  useEffect(()=>
  axios.get(`http://localhost:3000/users/getUser?user_id=${userId}`).then(function(response){
    // console.log(response.data[0].name);
    // console.log(response.data[0].outstanding_epf);
    setEPFcount(response.data[0].outstanding_epf);
    setFRname(response.data[0].name);
    }).catch(error =>{
        console.error("Error fetching OSL: ",error);
    }))

  return (
    <div>
      <div className="rectangle">
        <Logo />
        <div className="welcome">
          <label htmlFor="welcome">WELCOME</label>
        </div>
        <div className="oslPersonnel">
          <label htmlFor="oslPersonnel">{FRname}</label>
        </div>
        <div className="informationBox">
          <p className="informationText">There are {EPFcount} forms for your approval.</p>
        </div>
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

// const InformationBox = () => {
//   return (
//     <div className="informationBox">
//       <p className="informationText">There are 3 forms for your approval.</p>
//     </div>
//   )
// }



export default Homepage;