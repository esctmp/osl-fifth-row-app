import React from "react";
import logoicn from "../../../assets/images/logo-full.png";
const LogoIcon = () => {
  return (
    <div>
      <img 
      src={logoicn} 
      alt="logo"
      style={{ width: "auto", height: "43px" }}   // resize logo
      />
    </div>
  )
};

export default LogoIcon;
