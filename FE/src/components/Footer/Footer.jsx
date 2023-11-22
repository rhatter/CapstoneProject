import React from "react";
import logoImg from "../../img/logo.png";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import linkedin from "../../img/linkedin.svg";
import facebook from "../../img/facebook.svg";
import instagram from "../../img/instagram.svg";
const Footer = () => {
  return (
    <div className="Footer">
      <div className="areaLogo">
        <img src={logoImg} alt="" />
      </div>
      <div className="buttonArea">
        <div className="buttonLink">
          <img src={linkedin} alt="" />
        </div>
        <div className="buttonLink">
          <img src={facebook} alt="" />
        </div>
        <div className="buttonLink">
          <img src={instagram} alt="" />
        </div>
      </div>
      <div className="bar"></div>
      <div>
        <span>Alessandro Pozzato, Epicode Capstone Project 2023</span>
      </div>
    </div>
  );
};

export default Footer;
