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
import ArticlesSection from "../components/ArticlesSection/ArticlesSection";
import { useSelector } from "react-redux/es/hooks/useSelector";
function Home() {
  const [user, setUser] = useState(null);
  const [openMap, setOpenMap] = useState("coll");
  const coord = useFromTextToCoord();

  const imgsToBkg = [
    "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg",
  ];
  const selectImg = () => {
    return imgsToBkg[Math.floor(Math.random() * imgsToBkg.length)];
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userLocalData")));
  }, []);

  const redirectHandler = () => {
    window.location.href = `${process.env.REACT_APP_URL}/auth/github`;
  };
  const checkStates = () => {
    console.log(user);
  };

  const selector = useSelector((select) => select);
  useEffect(() => {
    selector.coord.value.latitude && setOpenMap("visib");
  }, [selector.coord]);

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
        <div className={`imgContainer ${openMap}`}>
          <img src={selectImg()} alt="" />
        </div>
        <div className={`mapContainer ${openMap}`}>
          <Maps />
        </div>
      </div>
      <div className="titleText">
        <span>Scegli la tua prossima avventura</span>
      </div>
      <ArticlesSection />
    </>
  );
}

export default Home;
