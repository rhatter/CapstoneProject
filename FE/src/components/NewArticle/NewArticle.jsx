import React, { useState, useEffect } from "react";
import MyNavBar from "../NavBar/NavBar";
import "./NewArticle.css";
import axios from "axios";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const NewArticle = ({ state }, setRefresh) => {
  const { commenting, setCommenting } = state;
  const [thisPost, setThisPost] = useState({});
  const [sendable, setSendable] = useState(false);
  const [formData, setFormData] = useState({});
  const [registerError, setRegisterError] = useState(null);
  const [image, setImage] = useState(null);
  const [changedImage, setChangedImage] = useState(false);
  const { articleID } = useParams();
  const userData = JSON.parse(localStorage.getItem("userLocalData"));

  useEffect(() => {
    setFormData({
      readTime: { unit: "Minuti", value: 15 },
      category: "Avventura",
      rate: 2.5,
      author: userData.id,
    });
  }, []);

  useEffect(() => {
    if (formData.title && formData.content && formData.readTime && image) {
      setSendable(true);
    } else {
      setSendable(false);
    }
  }, [formData, changedImage]);

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
    if (!sendable) {
      return;
    }
    let finalBody = { ...formData };
    try {
      if (image) {
        const uploadCover = await uploadFile(image);
        finalBody = {
          ...finalBody,
          cover: uploadCover.data.cover,
        };
      }
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/posts/create`,
        finalBody
      );
      setCommenting(false);
      window.location.reload(false);
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
      console.log(formData);
    } else {
      setFormData({ ...formData, [name]: value });
      console.log(formData);
    }
  };

  //devo chiamare il singolo post
  return (
    <>
      <div className={commenting ? "box visibl" : "box collaps"}>
        <Col xs={12} md={9} lg={6} xl={5}>
          <div className="newArticlePage">
            <div className="commentArea">
              <div className="formArea">
                <form
                  action=""
                  encType="multipart/form-data"
                  onSubmit={postUser}
                >
                  <div className="titleArea">
                    <span>Racconta la tua storia</span>
                  </div>
                  <div className="inputArea title">
                    <textarea
                      type="text"
                      placeholder="Dai un titolo alla tua storia"
                      name="title"
                      onChange={(e) => {
                        setThisPost({ ...thisPost, title: e.target.value });
                        formDataImport(e);
                      }}
                      value={thisPost.title ? thisPost.title : ""}
                    >
                      {thisPost.title}
                    </textarea>
                  </div>
                  <div className="inputArea content">
                    <textarea
                      type="text"
                      placeholder="Racconta la tua esperienza"
                      name="content"
                      onChange={(e) => {
                        setThisPost({ ...thisPost, content: e.target.value });
                        formDataImport(e);
                      }}
                      value={thisPost.content ? thisPost.content : ""}
                    ></textarea>
                  </div>
                  <div className="timeArea">
                    <div className="inputArea time">
                      <input
                        type="number"
                        name="value"
                        onChange={(e) => {
                          setThisPost({
                            ...thisPost,
                            readTime: {
                              ...thisPost.readTime,
                              value: e.target.value,
                            },
                          });
                          formDataImport(e);
                        }}
                        placeholder={
                          thisPost.readTime ? thisPost.readTime.value : 15
                        }
                        value={thisPost.readTime ? thisPost.readTime.value : 15}
                      ></input>
                    </div>
                    <div className="inputArea unit">
                      <select
                        list="time"
                        type="text"
                        placeholder="reading time"
                        name="unit"
                        onChange={(e) => {
                          setThisPost({
                            ...thisPost,
                            readTime: {
                              ...thisPost.readTime,
                              unit: e.target.value,
                            },
                          });
                          formDataImport(e);
                        }}
                        value={
                          thisPost.readTime ? thisPost.readTime.unit : "Minuti"
                        }
                      >
                        <option value="Minuti">Minuti</option>
                        <option value="Ore">Ore</option>
                        <option value="Secondi">Secondi</option>
                      </select>
                    </div>
                    <div className="inputArea file">
                      <label class="custom-file-upload">
                        <input
                          type="file"
                          placeholder="Immagine profilo"
                          name="cover"
                          onChange={(e) => {
                            onChangeImage(e);
                            setChangedImage(true);
                          }}
                        />
                        Immagine
                      </label>
                    </div>
                  </div>

                  {registerError && renderRegisterError()}
                  <button
                    type="submit"
                    className={sendable ? "sendable" : "unsendable"}
                  >
                    Aggiorna
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Col>
      </div>
    </>
  );
};

export default NewArticle;
