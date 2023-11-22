import React from "react";
import { Col } from "react-bootstrap";

import SingleArticle from "../SigleArticle/SingleArticle";
import "./MyArticleBody.css";
import { nanoid } from "nanoid";

const MyArticlesBody = ({ articles }) => {
  return (
    <>
      <div className="MyArticleBack"></div>
      <div className="MyArticlePage">
        <Col xs={12} sm={12} md={6}>
          <div className="ArticleArea">
            {articles.map((e) => (
              <div key={nanoid()}>
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
