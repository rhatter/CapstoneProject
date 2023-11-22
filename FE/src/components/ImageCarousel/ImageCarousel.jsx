import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import SingleImageCard from "../SingleImageCard/SingleImageCard";
import "./ImageCarousel.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useWindowWidth from "../../hooks/LarghezzaFinestra";

const ImageCarousel = () => {
  const [lastPosts, setLastPosts] = useState(null);
  const [numberImage, setNumberImage] = useState(4);
  const windowWidth = useWindowWidth();
  useEffect(() => {
    if (windowWidth < 576) {
      setNumberImage(2);
    } else if (windowWidth < 768) {
      setNumberImage(3);
    } else if (windowWidth < 992) {
      setNumberImage(4);
    } else if (windowWidth < 1200) {
      setNumberImage(5);
    } else {
      setNumberImage(6);
    }
  }, [windowWidth]);

  const postNumber = 8;
  async function getBooks() {
    const posts = await axios.get(
      `${process.env.REACT_APP_URL}/posts/last/${postNumber}`
    );
    const data = await posts.data;
    return setLastPosts(data);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: numberImage,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    getBooks();
  }, []);
  let SingleImageCardKey = 0;

  return (
    <div className="carouselImgCard">
      <div className="titleText" key={"imgCarousel1"}>
        <span>Nuove scoperte</span>
      </div>

      <Slider {...settings}>
        {lastPosts &&
          lastPosts.map((e, index) => {
            SingleImageCardKey++;
            return <SingleImageCard post={e} key={index} thatKey={index} />;
          })}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
