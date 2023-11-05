import React, { useState, useEffect } from "react";
import MyNavBar from "../components/NavBar/NavBar";
import "./Home.css";
import Articles from "../components/Articles/Articles";
import SearchBar from "../components/SearchBar/SearchBar";
import Maps from "../components/Map/Maps";
import useFromTextToCoord from "../hooks/FromTextToCoord";
import IndirizziForm from "../components/IndirizziForm/IndirizziForm";

function Home() {
  const [user, setUser] = useState(null);

  const coord = useFromTextToCoord();

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
        <IndirizziForm />
      </div>
      <SearchBar />
      <Articles />
    </>
  );
}

export default Home;
