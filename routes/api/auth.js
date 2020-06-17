const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("google-ClientID"),
      clientSecret: config.get("google-ClientSecret"),
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, done) {
      //check user table for anyone with a google ID of profile.id
      console.log("In google");
      User.findOne(
        {
          "google.id": profile.id,
        },
        function (err, user) {
          if (err) {
            return done(err);
          }
          //No user was found... so create a new user with values from Google (all the profile. stuff)
          if (!user) {
            user = new User({
              "google.id": profile.id,
              "google.name": profile.displayName,
              "google.email": profile.emails[0].value,
              "google.token": accessToken,
            });

            //jwt verification
            const payload = {
              user: {
                id: user.id,
              },
            };

            jwt.sign(
              payload,
              config.get("jwtSecret"),
              {
                expiresIn: 360000,
              },
              (err, token) => {
                console.log(token);
                if (err) throw err;
                res.json({ token });
              }
            );
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            //found user. Return
            console.log("User found");
            //jwt verification
            const payload = {
              user: {
                id: user.id,
              },
            };

            jwt.sign(
              payload,
              config.get("jwtSecret"),
              {
                expiresIn: 360000,
              },
              (err, token) => {
                console.log(token);
                if (err) throw err;
                res.json({ token });
              }
            );
            return done(err, user);
          }
        }
      );
    }
  )
);
router.get("/", (req, res) => res.send("Example Home page!"));

router.get("/failed", (req, res) => res.send("Failed to login"));
router.get("/good", (req, res) => {
  // req.headers["x-auth-token"] =
  //   req.user.google.token || req.user.facebook.token;
  // console.log(req.get("x-auth-token"));
  // console.log(JSON.stringify(req.headers));
  res.send("Welcome");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    res.redirect("/api/auth/good");
  }
);

// FACEBOOK AUHTENTICATION
passport.use(
  new FacebookStrategy(
    {
      clientID: config.get("facebook-ClientID"),
      clientSecret: config.get("facebook-ClientSecret"),
      callbackURL: "http://localhost:5000/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("In facebook");
      User.findOne(
        {
          "facebook.id": profile.id,
        },
        function (err, user) {
          if (err) {
            return done(err);
          }
          //No user was found... so create a new user with values from Facebook (all the profile. stuff)
          if (!user) {
            user = new User({
              "facebook.id": profile.id,
              "facebook.name": profile.displayName,
              "facebook.email": profile.emails[0].value,
              "facebook.token": accessToken,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            //found user. Return
            console.log("User found");
            return done(err, user);
          }
        }
      );
    }
  )
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/failed" }),
  function (req, res) {
    res.redirect("/api/auth/good");
  }
);

// router.get('/logout', (req, res) => {
//     req.session = null;
//     req.logout();
//     res.redirect('/');
// })

module.exports = router;
