import React, { useState, useEffect } from "react";
import MyNavBar from "../components/NavBar/NavBar";
import "./Home.css";
import Articles from "../components/Articles/Articles";
import SearchBar from "../components/SearchBar/SearchBar";
import Maps from "../components/Map/Maps";

function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userLocalData")));
  }, []);

  const redirectHandler = () => {
    window.location.href = `${process.env.REACT_APP_URL}/auth/github`;
  };
  const checkStates = () => {
    console.log(user);
  };

  return (
    <>
      <div className="homeNav">
        <MyNavBar />
      </div>
      <div>
        <Maps />
      </div>
      <SearchBar />
      <Articles />
    </>
  );
}

export default Home;
