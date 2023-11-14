import React, { useState, useEffect } from "react";
import MyNavBar from "../NavBar/NavBar";
import { nanoid } from "nanoid";
import axios from "axios";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import "./NewArticle.css";
import useFromTextToCoord from "../../hooks/FromTextToCoord";

const NewArticle = ({ state }, setRefresh) => {
  const { commenting, setCommenting } = state;
  const [thisPost, setThisPost] = useState({});
  const [sendable, setSendable] = useState(false);
  const [formData, setFormData] = useState({});
  const [registerError, setRegisterError] = useState(null);
  const [image, setImage] = useState(null);
  const [changedImage, setChangedImage] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { articleID } = useParams();
  const userData = JSON.parse(localStorage.getItem("userLocalData"));
  const [country, setCountry] = useState(null);
  const [dataToCoord, setDataToCoord] = useState(null);
  useEffect(() => {
    setFormData({
      author: userData.id,
    });
  }, []);

  const coord = useFromTextToCoord(dataToCoord);
  console.log(coord);
  useEffect(() => {
    if (
      formData.title &&
      formData.content &&
      image &&
      formData.city &&
      formData.country &&
      formData.topic
    ) {
      setSendable(true);
    } else {
      setSendable(false);
    }
  }, [formData, changedImage]);

  //
  const topicsOptions = [
    { value: "topic1", label: "Topic 1" },
    { value: "topic2", label: "Topic 2" },
    { value: "topic3", label: "Topic 3" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormData({
      ...formData,
      topic: selectedOption.map((e) => e.value),
    });
    console.log(formData);
  };

  //

  const uploadFile = async (cover) => {
    const fileData = new FormData();
    fileData.append("cover", cover);
    console.log(cover);
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
          coord: { lat: coord[0].lat, lon: coord[0].lon },
        };
      }
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/posts/create`,
        finalBody
      );
      setCommenting(false);
      //window.location.reload(false);
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
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const countryData = () => {
    const countries = Country.getAllCountries().filter(
      (e) =>
        e.currency === "EUR" ||
        e.currency === "USD" ||
        e.currency === "HRK" ||
        e.currency === "GBP"
    );
    //console.log(countries);
    return countries;
  };
  const cityData = () => {
    const cities = City.getCitiesOfCountry(
      Country.getAllCountries().filter((e) => e.name === country)[0].isoCode
    );
    return cities;
  };
  if (country && cityData());

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
                  <span className="Label">Dove sei stato?</span>
                  <div className="inputArea country">
                    <select
                      list="country"
                      type="text"
                      placeholder="Paese"
                      name="country"
                      onChange={(e) => {
                        setThisPost({
                          ...thisPost,
                          country: e.target.value,
                        });
                        formDataImport(e);
                        setCountry(e.target.value);
                      }}
                    >
                      {countryData().map((country) => (
                        <option key={nanoid()}>{country.name}</option>
                      ))}
                    </select>

                    <select
                      id="countryInput"
                      list="country"
                      type="text"
                      placeholder="Paese"
                      name="city"
                      onChange={(e) => {
                        setThisPost({
                          ...thisPost,
                          country: e.target.value,
                        });
                        formDataImport(e);
                        setDataToCoord(`${country}, ${e.target.value}`);
                      }}
                    >
                      {country &&
                        cityData().map((country) => (
                          <option key={nanoid()}>{country.name}</option>
                        ))}
                    </select>
                  </div>
                  <span className="Label">Scegli la categoria giusta</span>
                  <div className="Topics">
                    <Select
                      className=""
                      isMulti
                      options={topicsOptions}
                      placeholder="Tipo di attività..."
                      onChange={handleChange}
                    />
                  </div>
                  <div className="timeArea">
                    <div className="inputArea file">
                      <label className="custom-file-upload">
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
