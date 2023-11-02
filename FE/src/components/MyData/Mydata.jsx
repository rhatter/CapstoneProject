import React, { useEffect } from "react";
import "./Mydata.css";
import backImg from "../../img/mydata.jpg";
import { Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

function Mydata() {
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});
  const [registerError, setRegisterError] = useState(null);
  const [sendable, setSendable] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState(null);
  const [secondPassword, setSecondPassword] = useState(null);
  useEffect(() => {
    if (
      (password === secondPassword && formData.name) ||
      (password === secondPassword && formData.email) ||
      (password === secondPassword && formData.password) ||
      (password === secondPassword && formData.role) ||
      (password === secondPassword && image)
    ) {
      setSendable(true);
    } else {
      setSendable(false);
    }
  }, [formData, secondPassword, image]);

  const renderRegisterError = () => {
    return (
      <div>
        <span>{registerError}</span>
      </div>
    );
  };

  const navigate = useNavigate();
  const formDataImport = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const modifiedPassword = (e) => {
    setPassword(e.target.value);
  };
  const controlPassword = (e) => {
    setSecondPassword(e.target.value);
    e.target.value === password
      ? setRegisterError(null)
      : setRegisterError("Le password non sono uguali");
  };

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
  const postUser = async (e) => {
    e.preventDefault();
    let finalBody = { ...formData };
    try {
      if (image) {
        const uploadCover = await uploadFile(image);
        finalBody = {
          ...finalBody,
          usrImg: uploadCover.data.cover,
        };
      }
      const userId = JSON.parse(localStorage.getItem("userLocalData"));
      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/users/update/${userId.id}`,
        finalBody
      );
      localStorage.setItem(
        "userLocalData",
        JSON.stringify(jwt_decode(response.data.token))
      );
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/");
      return response;
    } catch (error) {
      setRegisterError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="formPage">
      <div
        className="imageArea"
        style={{ backgroundImage: `url(${backImg})` }}
      ></div>
      <Col xs={12} sm={10} md={8} lg={6} xl={6} className="column">
        <div className="preFormArea">
          <div></div>
          <div className="formArea">
            <form action="" encType="multipart/form-data" onSubmit={postUser}>
              <div className="titleArea">
                <span>Ciao Viaggiatore!</span>
              </div>
              <div className="subtitle">
                <span>Aggiorna i tuoi dati</span>
              </div>
              <div className="inputArea">
                <input
                  type="text"
                  placeholder="Il tuo nome"
                  name="name"
                  onChange={formDataImport}
                />
              </div>
              <div className="inputArea">
                <input
                  type="text"
                  placeholder="E-mail"
                  name="email"
                  onChange={formDataImport}
                />
              </div>
              <div className="inputArea areaRadio">
                <label
                  htmlFor="t1"
                  className={`radioButt ${
                    selectedRadius === 1 ? "selected" : ""
                  }`}
                  onClick={() => setSelectedRadius(1)}
                >
                  Creator
                </label>
                <input
                  className="radioButt"
                  type="radio"
                  id="t1"
                  name="role"
                  onChange={formDataImport}
                  value="Creator"
                />
                <label
                  htmlFor="t2"
                  className={`radioButt ${
                    selectedRadius === 2 ? "selected" : ""
                  }`}
                  onClick={() => setSelectedRadius(2)}
                >
                  Utente
                  <input
                    className="radioButt"
                    type="radio"
                    id="t2"
                    name="role"
                    onChange={formDataImport}
                    value="Utente"
                  />
                </label>
              </div>

              <div className="inputArea">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    formDataImport(e);
                    modifiedPassword(e);
                  }}
                  name="password"
                />
              </div>
              <div className="inputArea">
                <input
                  type="password"
                  placeholder="Ripeti password"
                  onBlur={controlPassword}
                />
              </div>
              <div className="inputArea">
                <label class="custom-file-upload">
                  <input
                    type="file"
                    placeholder="Immagine profilo"
                    name="cover"
                    onChange={onChangeImage}
                  />
                  Immagine profilo
                </label>
              </div>
              {registerError && renderRegisterError()}
              <button
                type="submit"
                className={sendable ? "sendable" : "unsendable"}
              >
                Registrati
              </button>
            </form>
          </div>
          <div className="titleArea"></div>
        </div>
      </Col>
    </div>
  );
}

export default Mydata;
