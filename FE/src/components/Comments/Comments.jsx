import React, { useEffect } from "react";
import Comment from "../Comment/Comment";
import "./Comments.css";
import { Col } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

function Comments({ post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, [post]);
  //devo importare i commenti collegati al post
  //console.log("post", post);
  const getComments = async () => {
    const gettingComments = await axios.get(
      `${process.env.REACT_APP_URL}/comment/byArticle?articleID=${post._id}`
    );
    setComments(gettingComments.data);
  };

  return (
    <div className="commentArea">
      <div className="commentBackground"></div>
      <Col xs={12} md={10} lg={9} xl={7} xxl={5} className="">
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </Col>
    </div>
  );
}

export default Comments;
