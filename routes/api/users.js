const express = require("express");
const passport = require("passport");
const User = require("../../models/User");
const router = express.Router();
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const config = require("config");

// @todo: failureRedirect not working, finish it!

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.getUserByUsername(username, function (err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "Invalid credentials" });
      }
      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
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
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid credentials" });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.post("/register", function (req, res) {
  var password = req.body.password;
  var password2 = req.body.password2;

  if (password == password2) {
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    User.createUser(newUser, function (err, user) {
      if (err) throw err;
      res.send(user).end();
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
  } else {
    res.status(500).send('{errors: "Passwords don\'t match"}').end();
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api/users",
    failureRedirect: "/api/users/login",
  }),
  function (req, res) {
    res.send(req.user);
  }
);

// Endpoint to get current user
router.get("/", function (req, res) {
  res.send(req.user);
});

// Endpoint to logout
router.get("/logout", function (req, res) {
  req.logout();
  res.send(null);
});

module.exports = router;
