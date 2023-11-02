import React, { useState, useEffect } from "react";
import MyNavBar from "../components/NavBar/NavBar";
import "./Home.css";
import { useSession } from "../middlewares/Protected";
import axios from "axios";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DetailedArticle from "../components/DetailedArticle/DetailedArticle";
import NewComment from "../components/NewComment/NewComment";
import Comments from "../components/Comments/Comments";

function Details() {
  const [thisPost, setThisPost] = useState({});
  const { bookId } = useParams();
  async function getBooks() {
    const post = await axios.get(
      `${process.env.REACT_APP_URL}/posts/byid/${bookId}`
    );
    setThisPost(post.data.post);
  }
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <MyNavBar />
      <DetailedArticle post={thisPost} />
      <Comments post={thisPost} />
    </>
  );
}

export default Details;
