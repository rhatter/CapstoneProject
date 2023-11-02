import React from "react";
import "./LoginForm.css";
import backImg from "../../img/loginBack.jpeg";
import { Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import gitIcon from "../../img/github.svg";

function LoginForm() {
  const [formData, setFormData] = useState({});
  const [utenteErrato, setUtenteErrato] = useState(false);
  const [logTried, setLogTried] = useState(false);

  const redirectHandler = () => {
    window.location.href = `${process.env.REACT_APP_URL}/auth/github`;
  };

  const navigate = useNavigate();

  const formDataImport = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const logUser = async (e) => {
    e.preventDefault();
    const finalBody = {
      ...formData,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/users/login`,
      finalBody
    );
    console.log(response.data.payload);
    localStorage.setItem(
      "userLocalData",
      JSON.stringify(jwt_decode(response.data.token))
    );
    localStorage.setItem("token", JSON.stringify(response.data.token));
    if (response.data.payload) {
      setUtenteErrato(false);
      navigate("/");
    } else {
      setLogTried(true);
      setUtenteErrato(true);
    }
    return response;
  };

  const renderErrorPW = () => {
    return (
      <div className="errorPassword">
        <span>Login o Password errate</span>
      </div>
    );
  };

  return (
    <div className="formPage">
      <Col xs={12} sm={8} md={6} lg={4} xl={4} className="column">
        <div className="preFormArea">
          <div></div>
          <div></div>
          <div className="formArea">
            <form action="" encType="multipart/form-data" onSubmit={logUser}>
              <div className="titleArea">
                <span>Condividi le tue esperienze</span>
              </div>
              <div className="inputArea">
                <input
                  type="text"
                  placeholder="E-mail"
                  name="email"
                  onChange={formDataImport}
                />
              </div>
              <div className="inputArea">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={formDataImport}
                />
              </div>
              {logTried && utenteErrato && renderErrorPW()}
              <button type="submit">Accedi</button>
            </form>
          </div>
          <button className="gitAccess" onClick={redirectHandler}>
            Accedi con Github
            <img className="gitIcon" src={gitIcon} alt="" />
          </button>
          <button className="registrati">Registrati</button>
        </div>
      </Col>

      <div
        className="imageArea"
        style={{ backgroundImage: `url(${backImg})` }}
      ></div>
    </div>
  );
}

export default LoginForm;
