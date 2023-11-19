import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./slideshow.css";
import VideoBox from "../VideoBox/VideoBox";
import { Col } from "react-bootstrap";
const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "70vh",
};
const slideImages = [
  {
    url: "https://res.cloudinary.com/dhknlp2bn/video/upload/v1700272036/postsImage/k7tngcvhu72fzhdcxdzz.mp4",
    caption: `Tra le strade, le storie e la cultura di ogni città`,
  },
  {
    url: "https://res.cloudinary.com/dhknlp2bn/video/upload/v1700272305/production_id_4912725_1080p_i6i1oq.mp4",
    caption:
      "Tra sapori irresistibili, tradizioni gastronomiche e delizie locali",
  },
  {
    url: "https://res.cloudinary.com/dhknlp2bn/video/upload/v1700272596/production_id_4125025_1080p_mcipmk.mp4",
    caption: "Tra gli alberi e i sentieri nascosti della natura più verde",
  },
  {
    url: "https://res.cloudinary.com/dhknlp2bn/video/upload/v1700272855/production_id_3987748_1080p_oszkgc.mp4",
    caption: "Esplora musei, gallerie e strade dalle storie millenarie",
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              className="back-img"
              style={{ backgroundImage: `url(${slideImage.url})` }}
            >
              <VideoBox e={slideImage.url}></VideoBox>
              <span className="coverText">{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
