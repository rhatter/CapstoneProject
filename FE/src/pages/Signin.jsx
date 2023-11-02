import React, { useState, useEffect } from "react";
import MyNavBar from "../components/NavBar/NavBar";
import SignIn from "../components/SignIn/SignIn";

function Signin() {
  const redirectHandler = () => {
    window.location.href = `${process.env.REACT_APP_URL}/auth/github`;
  };

  return (
    <>
      <div className="signPage">
        <MyNavBar />
        <SignIn />
      </div>
    </>
  );
}

export default Signin;
