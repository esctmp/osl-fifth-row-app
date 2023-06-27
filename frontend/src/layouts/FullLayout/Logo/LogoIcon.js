import React from "react";
import logoicn from "../../../assets/images/logo-full.png";
// used for sidebar logo
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
