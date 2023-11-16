import React, { useState, useEffect } from "react";
import MyNavBar from "../components/NavBar/NavBar";
import "./ModifyArticle.css";
import axios from "axios";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ModifyArticles from "../components/ModifyArticles/ModifyArticles";

const ModifyArticle = () => {
  const [thisPost, setThisPost] = useState({});
  const [sendable, setSendable] = useState(false);
  const [formData, setFormData] = useState({});
  const [registerError, setRegisterError] = useState(null);
  const [image, setImage] = useState(null);
  const [changedImage, setChangedImage] = useState(false);
  const { articleID } = useParams();
  const userData = JSON.parse(localStorage.getItem("userLocalData"));
  const getArticleById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/post/byid/${articleID}`
      );
      setThisPost(response.post);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getArticleById();
  }, []);

  useEffect(() => {
    if (formData.title || formData.content || formData.readTime || image) {
      setSendable(true);
    } else {
      setSendable(false);
    }
  }, [formData]);

  const uploadFile = async (cover) => {
    const fileData = new FormData();
    fileData.append("cover", cover);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/posts/cloudUpload`,
        fileData
      );
      return response;
    } catch (error) {
      console.log(error, "errore in upload file");
    }
  };

  const navigate = useNavigate();

  const renderRegisterError = () => {
    return (
      <div>
        <span>{registerError}</span>
      </div>
    );
  };

  const postUser = async (e) => {
    e.preventDefault();
    let finalBody = { ...formData };
    try {
      if (image) {
        const uploadCover = await uploadFile(image);
        finalBody = {
          ...finalBody,
          cover: uploadCover.data.cover,
        };
      }
      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/posts/update/${thisPost._id}`,
        finalBody
      );
      navigate(`/myarticle/${userData.id}`);
      return response;
    } catch (error) {
      setRegisterError(error.response);
      console.log(error.response);
    }
  };
  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  async function getBooks() {
    const post = await axios.get(
      `${process.env.REACT_APP_URL}/posts/byid/${articleID}`
    );
    setThisPost(post.data.post);
  }
  useEffect(() => {
    getBooks();
  }, []);

  const formDataImport = (e) => {
    const { name, value } = e.target;
    if (name === "value" || name === "unit") {
      setFormData({
        ...formData,
        readTime: { ...formData.readTime, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
      console.log(formData);
    }
  };

  //devo chiamare il singolo post
  return (
    <>
      <MyNavBar />
      <Col xs={12} className="modifyArticlePage">
        <ModifyArticles postUser={postUser}></ModifyArticles>
      </Col>
    </>
  );
};

export default ModifyArticle;
