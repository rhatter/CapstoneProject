const express = require("express");
const gh = express.Router();
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const session = require("express-session");
require("dotenv").config();

console.log(process.env.GITHUB_CLIENT_ID);
console.log(process.env.GITHUB_CLIENT_SECRET);
console.log(process.env.GITHUB_CALLBACK_URL);

gh.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

gh.use(passport.initialize());
gh.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

gh.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {
    const redirectUrl = `http://${
      process.env.REACT_APP_GIT_VAR_TEST
    }/success?user=${encodeURIComponent(JSON.sringify(req.user))}`;
    res.redirect(redirectUrl);
  }
);

gh.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(user, process.env.GITHUB_CALLBACK_URL);
    const redirectUrl = `http://${
      process.env.REACT_APP_GIT_VAR_TEST
    }/success/:${encodeURIComponent(token)}`;
    res.redirect(redirectUrl);
  }
);

gh.get("/success", (req, res) => {
  res.redirect(`http://${process.env.REACT_APP_GIT_VAR_TEST}/`);
});

module.exports = gh;
