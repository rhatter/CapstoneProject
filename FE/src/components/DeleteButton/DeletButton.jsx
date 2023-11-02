import React from "react";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const DeletButton = ({ postID }) => {
  const deletePost = async () => {
    console.log(postID);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_URL}/posts/delete/${postID}`,
        {}
      );
      window.location.reload(false);
      return res.data.json;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onClick={deletePost}>
      <FontAwesomeIcon icon={faTrash} />
    </div>
  );
};

export default DeletButton;
