import React from "react";
import { Link } from "react-router-dom";
import "./SingleImageCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SingleImageCard = ({ post, thatKey }) => {
  // console.log(post);
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
    <div className="imgCarouselArea">
      <div className="cardHover">
        <span className="title">{post.title}</span>
        <Link to={dirToDetails()}>
          <div className="scopri">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </Link>
        <span className="indirizzo">{`${post.city}, ${post.country} `}</span>
      </div>
      <img src={post.cover} alt="" />
    </div>
  );
};

export default SingleImageCard;
