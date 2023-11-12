import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logoImg from "../../img/logo.png";
import genericImg from "../../img/genProfile.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { nanoid } from "nanoid";

function MyNavBar() {
  const [logged, setLogged] = useState(false);
  const [userCheck, setUserCheck] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userLocalData"));

  useEffect(() => {
    const userDataCheck = JSON.parse(localStorage.getItem("userLocalData"));
    userDataCheck ? setLogged(true) : setLogged(false);
  }, [userCheck]);

  const createLoginButtons = () => {
    return [
      <Nav.Link href="/Login" key={nanoid()}>
        Accedi
      </Nav.Link>,
      <Nav.Link href="/Signin" key={nanoid()}>
        Registrati
      </Nav.Link>,
    ];
  };

  const createUsrProfile = () => {
    return [
      <div className="profileImgArea" key="profileImgArea">
        <img src={userData ? userData.usrImg : genericImg} alt="" />
      </div>,
    ];
  };

  const createLogoutButtons = () => {
    return (
      <div style={{ padding: "8px" }} key="logoutButton">
        <span className="logout" onClick={logoutFunction}>
          Logout
        </span>
      </div>
    );
  };

  const navigate = useNavigate();
  const logoutFunction = () => {
    setLogged(false);
    localStorage.removeItem("userLocalData");
    localStorage.removeItem("token");
    localStorage.removeItem("autorization");
    setUserCheck((prevstate) => {
      return prevstate + 1;
    });
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="NavBar">
      <Container fluid>
        <Navbar.Brand href="/" key={nanoid()}>
          <img src={logoImg} alt="bookLogo" />
        </Navbar.Brand>
        <div className="topRightGroup" key={nanoid()}>
          <Nav className="me-auto" key={nanoid()}></Nav>
          <Link to={"/book/mydata"} key={nanoid()}>
            {logged && createUsrProfile()}
          </Link>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className={logged && "toggleButt"}
            key={nanoid()}
          />
        </div>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={logged && "toggleButt"}
          key={nanoid()}
        >
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            {!logged && createLoginButtons()}

            {logged && (
              <Nav.Link href={`/myarticle/${userData.id}`} key={nanoid()}>
                I miei articoli
              </Nav.Link>
            )}
            {logged && createLogoutButtons()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
