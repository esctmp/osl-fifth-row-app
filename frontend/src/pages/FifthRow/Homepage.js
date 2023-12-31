import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import logo_short from "../../assets/images/logo-short.png";
import { UserID } from "../../routes/UserID";
import "./Homepage.css";
import apis from "../../../src/apis"

let env = "LOCAL"

const Homepage = () => {
  const[FRname,setFRname] = useState("User");
  const[EPFcount, setEPFcount] = useState("_");
  const {userId,setUserId} = useContext(UserID);
  console.log(`${apis[env].getUser}?user_id=${userId}`);
  useEffect(()=>
  axios.get(`${apis[env].getUser}?user_id=${userId}`).then(function(response){
    console.log(response);
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
          <label htmlFor="welcome">WELCOME</label>
        </div>
        <div className="fifthRow">
          <label htmlFor="fifthRow" data-testid = "username">{FRname}</label>
        </div>
        <div className="informationBox">
          <p className="informationText" data-testid = "epfcount">You have {EPFcount} outstanding forms to review.</p>
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

export default Homepage;