import React from "react";
import MyNavBar from "../components/NavBar/NavBar";
import MyArticlesBody from "../components/MyArticles/MyArticlesBody";

import ButtonNew from "../components/ButtonNew/ButtonNew";
import NewArticle from "../components/NewArticle/NewArticle";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CSSProperties } from "react";
import BarLoader from "react-spinners/GridLoader";

function MyArticles() {
  const [commenting, setCommenting] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [articles, setArticle] = useState([]);
  const { userID } = useParams();
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    getArticles();
  }, [refresh]);

  const getArticles = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/post/byAuthor/${userID}`
      );
      setArticle(result.data.payload);
      //console.log(result.data.payload);
    } catch (error) {
      console.log(error);
    }
  };
  const elevateSetState = (e) => setLoading(e);

  return (
    <>
      <div className="myArticlePage">
        <MyNavBar />
        <ButtonNew
          state={{ commenting: commenting, setCommenting: setCommenting }}
        />
        <NewArticle
          state={{ commenting: commenting, setCommenting: setCommenting }}
          setRefresh={setRefresh}
          setLoading={elevateSetState}
        />
        <div className="titleText">
          <span>I tuoi posti preferiti</span>
        </div>
        {loading && (
          <div
            className="spinnerBox"
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 99,
              width: "100%",
              height: "100vh",
              top: "10rem",
              pointerEvents: "none",
            }}
          >
            <BarLoader color="white" />
          </div>
        )}
        <MyArticlesBody refresh={refresh} articles={articles} />
      </div>
    </>
  );
}

export default MyArticles;
