import React, { useState, useEffect } from "react";
import "./DetailedArticle.css";
import { Col } from "react-bootstrap";
import Comments from "../Comments/Comments";
import NewComment from "../NewComment/NewComment";
import Maps from "../Map/Maps";
import { useDispatch } from "react-redux";
import { CoordUpdate } from "../../reducers/generalCoord";

function DetailedArticle({ post }) {
  const [firstLine, setFirstLine] = useState("");
  const [restOfTheLines, setRestOfTheLine] = useState([]);
  useEffect(() => {}, [post]);
  let restOfTheLinesArr = [];
  const allContent = () => {
    if (!post.content) {
      return;
    }
    const text = post.content;
    const splittedText = text.split(`.`);
    setFirstLine(splittedText[0] + ".");
    const secondSplit = text.split(`\n`);
    for (let i = 1; i < secondSplit.length; i++) {
      restOfTheLinesArr.push(secondSplit[i]);
    }
    setRestOfTheLine(restOfTheLinesArr);
  };
  useEffect(() => {
    allContent();
  }, [post]);
  console.log("post", post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.content) {
      dispatch(
        CoordUpdate({ latitude: post.coord.lat, longitude: post.coord.lon })
      );
    }
  }, [post]);

  return (
    <div className="singleArticlePage">
      <div className="colorBackground"></div>
      <div className="authorArea">
        <span>{post.author && post.author.name}</span>
      </div>
      <div className="line"></div>
      <div className="titleArea">
        <span>{post.title}</span>
      </div>
      <Col xs={12} sm={11} md={10} lg={7} xl={6} className="mainArea">
        <div className="imageArea">
          <img src={post.cover} alt="" />
        </div>

        <div className="contentArea">
          <div className="firstBlock">
            <div className="stiked">
              <div className="authorphotoArea">
                <img
                  src={post.author && post.author.usrImg}
                  alt=""
                  className="authorImg"
                />
              </div>

              <div className="authorNameArea">
                <span>{post.author && post.author.name}</span>
              </div>
            </div>
          </div>
          <Col xs={12} md={8} className="centralBlock">
            <div className="firstParagraph">
              <p>{firstLine}</p>
            </div>
            <div className="restOfContent">
              {restOfTheLines.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </Col>
          <div className="lastBlock"></div>
        </div>
        <div className={`mapContainer `}>
          <Maps />
        </div>
      </Col>
    </div>
  );
}

export default DetailedArticle;
