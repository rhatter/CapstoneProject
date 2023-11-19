import React from "react";
import { topicOptions } from "../../data/topicOption";
import "./ArticlesSection.css";
import { Col } from "react-bootstrap";
import Articles from "../Articles/Articles";
import { Slide } from "react-slideshow-image";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { nanoid } from "nanoid";
function ArticlesSection() {
  const [slideMe, setSlideMe] = useState("-100%");
  const [topicSelected, setTopicSelected] = useState([
    false,
    true,
    false,
    false,
  ]);

  useEffect(() => {
    shuffle(randomTopic);
  }, []);
  let randomTopic = [...topicOptions];

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const selectedTopic = [
    { ...randomTopic[0], name: 2 },
    { ...randomTopic[1], name: 3 },
    { ...randomTopic[2], name: 4 },
  ];

  const singleTopic = (topic) => {
    return (
      <div
        data-number={topic.name}
        className={`ToopicButton ${
          topicSelected[topic.name - 1] && "selected"
        }`}
        onClick={(e) => Slide(e)}
        key={nanoid()}
      >
        <span>{topic.label}</span>
      </div>
    );
  };

  const Slide = (e) => {
    let variation = 0;
    switch (e.target.dataset.number) {
      case "1":
        variation = "0%";
        setTopicSelected([true, false, false, false]);
        break;
      case "2":
        variation = "-100%";
        setTopicSelected([false, true, false, false]);
        break;
      case "3":
        variation = "-200%";
        setTopicSelected([false, false, true, false]);
        break;
      case "4":
        variation = "-300%";
        setTopicSelected([false, false, false, true]);
        break;
      default:
        break;
    }
    setSlideMe(variation);
  };

  const selector = useSelector((select) => select);
  const articles = selector.FilteredArticles.data;
  console.log(articles);
  //   console.log(selector);

  let keyCounter = 111;

  return (
    <>
      <div className="HeaderArea" key={4}>
        <Col sm={12} md={10} lg={8} xl={6} className="HeaderBar">
          {articles && (
            <div
              data-number="1"
              onClick={(e) => Slide(e)}
              className={`ToopicButton ${topicSelected[0] && "selected"}`}
              key={3}
            >
              <span>La tua ricerca</span>
            </div>
          )}
          {selectedTopic.map((topic) => {
            return singleTopic(topic);
          })}
        </Col>
      </div>
      <div className="ArticlesSlideshowArea" key={2}>
        <div className="ArticlesSlideshow" style={{ left: slideMe }}>
          <Articles ArtKey={keyCounter} topic={false} />
          {selectedTopic.map((topic) => {
            keyCounter++;
            return <Articles topic={topic} key={"key" + keyCounter} />;
          })}
        </div>
      </div>
    </>
  );
}

export default ArticlesSection;
