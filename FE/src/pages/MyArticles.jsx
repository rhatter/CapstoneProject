import React from "react";
import MyNavBar from "../components/NavBar/NavBar";
import MyArticlesBody from "../components/MyArticles/MyArticlesBody";

import ButtonNew from "../components/ButtonNew/ButtonNew";
import NewArticle from "../components/NewArticle/NewArticle";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function MyArticles() {
  const [commenting, setCommenting] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [articles, setArticle] = useState([]);
  const { userID } = useParams();

  useEffect(() => {
    getArticles();
  }, [refresh]);

  const getArticles = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/post/byAuthor/${userID}`
      );
      setArticle(result.data.payload);
      console.log(result.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

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
        />
        <MyArticlesBody refresh={refresh} articles={articles} />
      </div>
    </>
  );
}

export default MyArticles;
