import React, { useState, useEffect } from "react";
import MyNavBar from "../components/NavBar/NavBar";
import "./Home.css";
import { useSearchParams, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";
import "./Success.css";
import backImg from "../img/externalLogin.jpg";

function Success() {
  const { token } = useParams();
  const [formData, setFormData] = useState({});
  const [registerError, setRegisterError] = useState(null);
  const [selectedRadius, setSelectedRadius] = useState(null);
  const [sendable, setSendable] = useState(false);
  const [findUserResult, setFindUserResult] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const renderRegisterError = () => {
    return (
      <div>
        <span>{registerError}</span>
      </div>
    );
  };

  const formDataImport = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const verifyUserPreregistration = async (e) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/user/extAccess/${e}`
      );
      localStorage.setItem(
        "userLocalData",
        JSON.stringify(jwt_decode(response.data.token))
      );
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/");
      setLoading(false);
    } catch (error) {
      setFindUserResult(false);
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    const dataToken = jwt_decode(token);
    const verify = verifyUserPreregistration(dataToken.id);

    console.log("pre verify", verify);
    setFormData({
      password: dataToken.displayName,
      name: dataToken.username,
      usrImg: dataToken.photos[0].value,
      externalID: dataToken.id,
    });
  }, []);

  useEffect(() => {
    if (formData.email && formData.role) {
      setSendable(true);
    } else {
      setSendable(false);
    }
    console.log(formData);
  }, [formData]);

  const postUser = async (e) => {
    e.preventDefault();
    let finalBody = { ...formData };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/users/create`,
        finalBody
      );
      console.log(jwt_decode(response.data.token));
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
    <>
      <div className="successPage">
        <MyNavBar />
        {loading && (
          <div
            className="loaderBack"
            style={{ backgroundImage: "URL(" + backImg + ")" }}
          >
            <div class="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        )}

        {!loading && (
          <div
            className="successPage"
            style={{ backgroundImage: "URL(" + backImg + ")" }}
          >
            <Col xs={12} sm={10} md={5} lg={4} xl={3} className="column">
              <div className="preFormArea">
                <div></div>
                <div className="formArea">
                  <form
                    action=""
                    encType="multipart/form-data"
                    onSubmit={postUser}
                  >
                    <div className="titleArea">
                      <span>Benvenuto</span>
                    </div>
                    <div className="subtitle">Completa i tuoi dati</div>

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
                    {registerError && renderRegisterError()}
                    <button
                      type="submit"
                      className={
                        sendable ? "succButt sendable" : "succButt unsendable"
                      }
                    >
                      Registrati
                    </button>
                  </form>
                </div>
                <div></div>
              </div>
            </Col>
          </div>
        )}
      </div>
    </>
  );
}

export default Success;
