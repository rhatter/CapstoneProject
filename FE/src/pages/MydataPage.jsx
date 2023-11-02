import React, { useState, useEffect } from "react";
import MyNavBar from "../components/NavBar/NavBar";
import Mydata from "../components/MyData/Mydata";

function MydataPage() {
  const redirectHandler = () => {
    window.location.href = `${process.env.REACT_APP_URL}/auth/github`;
  };

  return (
    <>
      <div className="Mydatapage">
        <MyNavBar />
        <Mydata />
      </div>
    </>
  );
}

export default MydataPage;
