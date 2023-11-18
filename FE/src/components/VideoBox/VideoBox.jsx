import React from "react";
import "./VideoBox.css";

const VideoBox = ({ e }) => {
  const src = () => {
    return e
      ? e
      : "https://player.vimeo.com/external/406193215.sd.mp4?s=e00cba229aa572e28b732fa61a505dd6e71b8d2a&profile_id=164&oauth2_token_id=57447761";
  };
  return (
    <video
      src={src()}
      controls=""
      autoplay=""
      loop
      preload="auto"
      muted
      className="video"
    />
  );
};

export default VideoBox;
