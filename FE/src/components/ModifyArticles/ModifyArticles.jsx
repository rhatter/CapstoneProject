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
//import "./NewArticle.css";
import useFromTextToCoord from "../../hooks/FromTextToCoord";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGeoloc from "../../hooks/Geoloc";
import "./ModifyArticles.css";

const ModifyArticles = () => {
  const userData = JSON.parse(localStorage.getItem("userLocalData"));
  const { articleID } = useParams();
  const [thisPost, setThisPost] = useState({});
  const [sendable, setSendable] = useState(false);
  const [formData, setFormData] = useState({});
  const [registerError, setRegisterError] = useState(null);
  const [image, setImage] = useState(null);
  const [changedImage, setChangedImage] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [country, setCountry] = useState(null);
  const [dataToCoord, setDataToCoord] = useState(null);
  const [geolocIsSelected, setGeolocIsSelected] = useState(false);
  const [contruiesState, setCountries] = useState(null);
  const [indirizzoText, setIndirizzoText] = useState(null);
  const [indirizzoNumber, setIndirizzoNumber] = useState(null);
  //use effect per comporre il primo form data da mandare in post
  useEffect(() => {
    setFormData({
      author: userData.id,
    });
    countryData();
  }, []);
  //use effect controlla se il form e inviabile
  useEffect(() => {
    console.log(formData);
    if (
      formData.title &&
      formData.content &&
      formData.city &&
      formData.country &&
      formData.topic &&
      formData.coord
    ) {
      setSendable(true);
    } else {
      setSendable(false);
    }
  }, [formData, changedImage]);
  //creo il navigator
  const navigate = useNavigate();

  //funzione per chiamare i paesi filtrati per dare le option al select
  const countryData = () => {
    const countries = Country.getAllCountries().filter(
      (e) =>
        e.currency === "EUR" ||
        e.currency === "USD" ||
        e.currency === "HRK" ||
        e.currency === "GBP"
    );
    return countries;
  };
  const cityData = () => {
    const cities = City.getCitiesOfState(
      Country.getAllCountries().filter((e) => e.name === formData.country)[0]
        .isoCode,
      State.getStatesOfCountry(
        Country.getAllCountries().filter((e) => e.name === formData.country)[0]
          .isoCode
      ).filter((st) => st.name === formData.region)[0].isoCode
    );
    return cities;
  };

  const regionData = () => {
    const regions = State.getStatesOfCountry(
      Country.getAllCountries().filter((e) => e.name === formData.country)[0]
        .isoCode
    );
    //console.log(regions);
    return regions;
  };

  //funzione collegata al click di geoloc ancora da completare
  const SelectedGeoloc = (e) => {
    e.preventDefault();
    setGeolocIsSelected((r) => (r === true ? false : true));
  };

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        coord: { lat: fromGeoloc.latitude, lon: fromGeoloc.longitude },
      };
    });
  }, []);

  const fromGeoloc = useGeoloc(geolocIsSelected);
  const Dammi = (params) => {
    setFormData((prev) => {
      return {
        ...prev,
        coord: { lat: fromGeoloc.latitude, lon: fromGeoloc.longitude },
      };
    });
  };

  //console.log(fromGeoloc);
  //dati coordinata da mandare a nominatin per avere le coordinate
  //collegato ad uno stato per lanciarlo quando quello stato cambia
  const coord = useFromTextToCoord(dataToCoord);
  //console.log(coord);
  const coordError = () => {
    if (coord && !coord[0] && !geolocIsSelected) {
      return (
        <span className="Error">
          Inserisci un indirizzo corretto o premi il pulsante di
          Geolocalizzazione
        </span>
      );
    }
  };

  //topics option, da chiamare lato server ma non ora
  const topicsOptions = [
    { value: "sport", label: "Sport" },
    { value: "food", label: "Cucina" },
    { value: "museo", label: "museo" },
    { value: "storia", label: "Storico" },
    { value: "art", label: "Artistico" },
  ];

  //funzione che aggiunge al form data i topic selezionati
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormData({
      ...formData,
      topic: selectedOption.map((e) => e.value),
    });
    //console.log(formData);
  };

  //funzione per il lancio dell'upload su cloudinary dell'immagine
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

  //funzione per renderizzare gli errori alle chiamate server
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
    let address = "";
    let actualCoord = { lat: null, lon: null };
    if (coord && coord[0]) {
      console.log(coord);
      address = { addressName: indirizzoText, addressNumber: indirizzoNumber };
      actualCoord = { lat: coord[0].lat, lon: coord[0].lon };
    } else if (fromGeoloc) {
      address = { addressName: null, addressNumber: null };
      actualCoord = { lat: fromGeoloc.latitude, lon: fromGeoloc.longitude } =
        fromGeoloc;
    }
    let finalBody = { ...formData };
    try {
      if (image) {
        const uploadCover = await uploadFile(image);
        finalBody = {
          ...finalBody,
          cover: uploadCover.data.cover,
        };
        console.log(finalBody);
      }

      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/posts/update/${thisPost._id}`,
        finalBody
      );
      navigate(`/myarticle/${userData.id}`);
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
    console.log(post);
    setThisPost(post.data.post);
    setFormData((prev) => {
      return {
        ...prev,
        address: {
          addressName: post.data.post.address.addressName,
          addressNumber: post.data.post.address.addressNumber,
        },
        city: post.data.post.city,
        country: post.data.post.country,
        coord: post.data.post.coord,
        region: post.data.post.region,
        topic: post.data.post.topic,
        cover: post.data.post.cover,
        title: post.data.post.title,
        content: post.data.post.content,
      };
    });
  }
  useEffect(() => {
    getBooks();
  }, []);

  const formDataImport = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //devo chiamare il singolo post
  return (
    <>
      <div className={"box visibl"}>
        <Col xs={12} md={9} lg={6}>
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
                      value={formData.title ? formData.title : ""}
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
                      value={formData.content ? formData.content : ""}
                    ></textarea>
                  </div>
                  <span className="Label">Dove sei stato?</span>
                  <div className="inputArea country">
                    <select
                      value={formData.country}
                      type="text"
                      placeholder="Paese"
                      name="country"
                      onChange={(e) => {
                        formDataImport(e);
                        setCountry(e.target.value);
                      }}
                    >
                      {countryData() &&
                        countryData().map((country) => (
                          <option key={nanoid()}>{country.name}</option>
                        ))}
                    </select>
                    <select
                      value={formData.region}
                      id="countryInput"
                      type="text"
                      placeholder="Regione"
                      name="region"
                      onChange={(e) => {
                        formDataImport(e);
                        setDataToCoord(`${country}, ${e.target.value}`);
                      }}
                    >
                      {formData.country &&
                        regionData().map((country) => (
                          <option key={nanoid()}>{country.name}</option>
                        ))}
                    </select>
                    <select
                      value={formData.city}
                      id="countryInput"
                      type="text"
                      placeholder="Paese"
                      name="city"
                      onChange={(e) => {
                        formDataImport(e);
                        setDataToCoord(`${country}, ${e.target.value}`);
                      }}
                    >
                      {formData.region &&
                        cityData().map((country) => (
                          <option key={nanoid()}>{country.name}</option>
                        ))}
                    </select>
                  </div>
                  <div
                    className={`routeArea ${
                      geolocIsSelected ? "centered" : ""
                    }`}
                  >
                    <button
                      variant="primary"
                      onClick={SelectedGeoloc}
                      className="Geoloc"
                      onBlur={Dammi}
                    >
                      <FontAwesomeIcon icon={faLocationDot} />
                    </button>

                    {
                      <>
                        <input
                          value={
                            formData.address && formData.address.addressName
                          }
                          type="text"
                          className="route"
                          placeholder="Scegli la via"
                          onChange={(e) => {
                            setFormData((prev) => {
                              return {
                                ...prev,
                                address: {
                                  ...prev.address,
                                  addressName: e.target.value,
                                },
                              };
                            });
                            setDataToCoord(
                              `${formData.country}, ${formData.city} , ${e.target.value}`
                            );
                          }}
                          onBlur={(e) => {
                            console.log(coord[0]);
                            if (coord[0]) {
                              setFormData((prev) => {
                                return {
                                  ...prev,
                                  coord: {
                                    lat: coord[0].lat,
                                    lon: coord[0].lon,
                                  },
                                };
                              });
                            }
                            setIndirizzoText(e.target.value);
                          }}
                        />
                        <input
                          value={
                            formData.address && formData.address.addressNumber
                          }
                          onChange={(e) => {
                            setFormData((prev) => {
                              return {
                                ...prev,
                                address: {
                                  ...prev.address,
                                  addressNumber: e.target.value,
                                },
                              };
                            });
                            setDataToCoord(
                              `${formData.country}, ${formData.city} , ${indirizzoText} ${e.target.value}`
                            );
                          }}
                          type="number"
                          className="civico"
                          placeholder="Civico"
                          onBlur={(e) => {
                            if (coord[0]) {
                              setFormData((prev) => {
                                return {
                                  ...prev,
                                  coord: {
                                    lat: coord[0].lat,
                                    lon: coord[0].lon,
                                  },
                                };
                              });
                            }
                            setIndirizzoNumber(e.target.value);
                          }}
                        />
                      </>
                    }
                  </div>
                  {coordError()}
                  <span className="Label">Scegli la categoria giusta</span>
                  <div className="Topics">
                    {formData.topic && (
                      <Select
                        className=""
                        isMulti
                        options={topicsOptions}
                        placeholder="Tipo di attività..."
                        onChange={handleChange}
                        defaultValue={formData.topic.map((e) => {
                          return { label: e, value: e };
                        })}
                      />
                    )}
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

export default ModifyArticles;
