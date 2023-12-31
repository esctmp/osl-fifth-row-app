import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import test_logo from "../../assets/images/logo-short.png";
import { UserID } from "../../routes/UserID";
import "./Homepage.css";
import apis from "../../../src/apis"

let env = "LOCAL"

const Homepage = () => {
  const[FRname,setFRname] = useState("OSL User");
  const[EPFcount, setEPFcount] = useState("_");
  const {userId,setUserId} = useContext(UserID);
  console.log(`${apis[env].getUser}?user_id=${userId}`);
  useEffect(()=>
  axios.get(`${apis[env].getUser}?user_id=${userId}`).then(function(response){
    console.log(response);
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


export default Homepage;