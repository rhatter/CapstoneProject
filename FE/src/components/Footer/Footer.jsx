import React from "react";
import logoImg from "../../img/logo.png";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="Footer">
      <div className="areaText"></div>
      <div className="areaLogo">
        <img src={logoImg} alt="" />
      </div>
    </div>
  );
};

export default Footer;
