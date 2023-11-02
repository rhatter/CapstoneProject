import React from "react";
import { useState, useEffect } from "react";
import "./SingleArticle.css";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeletButton from "../DeleteButton/DeletButton";

function SingleArticle({ post, modify, articleID }) {
  const [commentable, setCommentable] = useState(false);

  useEffect(() => {
    console.log("dati", post);
  }, []);
  const userData = JSON.parse(localStorage.getItem("userLocalData"));
  const dirToDetails = () => {
    if (userData) {
      return userData.role === "Utente" || userData.role === "Creator"
        ? `/book/user/${post._id}`
        : `/book/${post._id}`;
    } else {
      return `/book/${post._id}`;
    }
  };

  return (
    <>
      <Col className="cardArea" sm={12} lg={12} xl={6}>
        <div
          className="Card"
          onClick={() => {
            commentable ? setCommentable(false) : setCommentable(true);
          }}
        >
          <div className="CardImageArea">
            <div className="CardImage">
              <Link to={dirToDetails()}>
                <img src={post.cover} alt="" className="Immagine" />
              </Link>
            </div>
          </div>
          <div className="CardTextArea">
            <div className="TitleArea">
              <p className="title">{post.title}</p>
            </div>
            <div className="ContentArea">
              <p className="content">{post.content}</p>
            </div>
            <div className="ReadTimeArea">
              <span className="Author">{post.author.name}</span>
              <span className="ReadTime">
                {post.readTime.value} {post.readTime.unit}
              </span>
            </div>
            <div className="categoryArea">
              <span className="category">{post.category}</span>
            </div>
          </div>
        </div>
      </Col>
      <div
        className={`modifyArticle ${modify ? "" : "collapse"} ${
          commentable ? "commentable" : "notcommentable"
        }`}
      >
        <Link to={`/modyfyarticle/${articleID}`}>
          <span>Modifica</span>
          <FontAwesomeIcon icon={faPencil} />
        </Link>
        <DeletButton postID={articleID}></DeletButton>
      </div>
    </>
  );
}
export default SingleArticle;
