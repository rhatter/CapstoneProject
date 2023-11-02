import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import SingleArticle from "../SigleArticle/SingleArticle";
import "./Articles.css";
import Pagination from "../pagination/Pagination";

function Articles() {
  const [articlesData, setArticles] = useState([]);

  useEffect(() => {
    getArticles();
  }, []);

  async function getArticles() {
    const Articles = await axios.get(`${process.env.REACT_APP_URL}/posts`);
    setArticles(Articles.data.posts);
    return Articles;
  }

  const createArticles = () => {
    console.log("article data", articlesData);
    return (
      <div className="ArticlesArea">
        <Col xs={12} md={12}>
          <Pagination />
        </Col>
      </div>
    );
  };
  return <>{articlesData ? createArticles() : "mancato"}</>;
}

export default Articles;
