import React, { useState, useEffect } from "react";
import MyNavBar from "../components/NavBar/NavBar";
import "./Home.css";
import Articles from "../components/Articles/Articles";
import SearchBar from "../components/SearchBar/SearchBar";
import Maps from "../components/Map/Maps";
import useFromTextToCoord from "../hooks/FromTextToCoord";
import IndirizziForm from "../components/IndirizziForm/IndirizziForm";
import { nanoid } from "nanoid";
import Slideshow from "../components/slideshow/slideshow";
import VideoBox from "../components/VideoBox/VideoBox";
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

      <Slideshow></Slideshow>
      <div className="titleText">
        <span>Scopri il mondo intorno a te</span>
      </div>
      <div>
        {1 === 0 && <SearchBar />}

        <IndirizziForm />
        <Maps />
      </div>
      <Articles />
    </>
  );
}

export default Home;
