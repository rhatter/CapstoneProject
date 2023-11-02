import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleArticle from "../SigleArticle/SingleArticle";
import "./MyArticleBody.css";

const MyArticlesBody = ({ articles }) => {
  const renderSingleArticle = () => {
    return articles.map((article) => <SingleArticle post={article} />);
  };
  console.log(renderSingleArticle());

  const toPrompt = articles.map((e) => {
    return {
      author: e.author.name,
      title: e.title,
      content: e.content,
      cover: e.cover,
      _id: e._id,
      readTime: { unit: e.readTime.unit, value: e.readTime.value },
      category: e.category,
      rate: e.rate,
    };
  });

  return (
    <>
      <div className="MyArticleBack"></div>
      <div className="MyArticlePage">
        <Col xs={12} sm={12} md={10}>
          <div className="ArticleArea">
            {articles.map((e) => (
              <div>
                <SingleArticle post={e} modify={true} articleID={e._id} />
              </div>
            ))}
          </div>
        </Col>
      </div>
    </>
  );
};

export default MyArticlesBody;
