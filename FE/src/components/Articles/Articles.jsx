import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import SingleArticle from "../SigleArticle/SingleArticle";
import "./Articles.css";
import Pagination from "../pagination/Pagination";
import { nanoid } from "nanoid";

function Articles({ topic, articles }) {
  const createArticles = () => {
    //console.log("article data", articlesData);
    return (
      <div className="ArticlesArea">
        <Col xs={12} md={12}>
          <Pagination topic={topic} articles={articles} />
        </Col>
      </div>
    );
  };
  return <>{createArticles()}</>;
}

export default Articles;
