import React, { useEffect, useState } from "react";

import "./ButtonNew.css";
import { Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function ButtonNew({ state, bookId, setCommented }) {
  const [postData, setPostData] = useState({});
  const { commenting, setCommenting } = state;
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userLocalData"));
    setPostData({ ...postData, postID: bookId, authorID: userData._id });
  }, []);

  const PostNewComment = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/comment/create`,
      postData
    );
    setCommented((prevState) => {
      return prevState + 1;
    });
    inCommenting();
  };

  const addTextToPost = (e) => {
    setPostData({ ...postData, content: e.target.value });
    console.log("post", postData);
  };
  const inCommenting = () => {
    commenting ? setCommenting(false) : setCommenting(true);
  };
  const userData = JSON.parse(localStorage.getItem("userLocalData"));

  return (
    <div className="newCommentArea">
      <div
        className="newCommentButton"
        onClick={(e) => {
          inCommenting();
        }}
      >
        <span>+</span>
      </div>
      <Col xs={10} md={8} lg={4}></Col>
    </div>
  );
}

export default ButtonNew;
