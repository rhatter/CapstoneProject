import React, { useState, useEffect } from "react";
import MyNavBar from "../components/NavBar/NavBar";
import "./Home.css";
import { useSession } from "../middlewares/Protected";

function Details() {
  const fakeAuth = () => {
    localStorage.setItem(
      "autorization",
      JSON.stringify(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      )
    );
  };
  const session = useSession();
  console.log(session);

  useEffect(() => {
    fakeAuth();
  }, []);

  return <MyNavBar />;
}

export default Details;
