import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./pages/Details";
import Error from "./pages/Error";
import Success from "./pages/Success";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import Protected from "./middlewares/Protected";
import UserDetail from "./pages/UserDetail";
import MydataPage from "./pages/MydataPage";
import MyArticles from "./pages/MyArticles";
import ModifyArticle from "./pages/ModifyArticle";
import { nanoid } from "nanoid";
import "react-slideshow-image/dist/styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} key={nanoid()} />
        <Route path="/book/:bookId" element={<Details />} key={nanoid()} />

        <Route path="/success/:token" element={<Success />} key={nanoid()} />
        <Route path="/Login" element={<Login />} key={nanoid()} />
        <Route path="/Signin" element={<Signin />} key={nanoid()} />

        <Route element={<Protected />} key={nanoid()}>
          <Route
            path="/book/user/:bookId"
            element={<UserDetail />}
            key={nanoid()}
          />
          <Route path="/book/mydata" element={<MydataPage />} key={nanoid()} />
          <Route
            path="/myarticle/:userID"
            element={<MyArticles />}
            key={nanoid()}
          />
          <Route
            path="/modyfyarticle/:articleID"
            element={<ModifyArticle />}
            key={nanoid()}
          />
        </Route>

        <Route path="*" element={<Error />} key={nanoid()} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
