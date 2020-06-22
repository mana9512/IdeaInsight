const express = require("express");
const passport = require("passport");
const User = require("../../models/User");
const router = express.Router();
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const config = require("config");
const auth=require('../../middleware/auth')
const { check, validationResult } = require("express-validator");
const bcrypt=require('bcryptjs')

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

// router.post("/register", function (req, res) {
//   var password = req.body.password;
//   var password2 = req.body.password2;

//   if (password == password2) {
//     var newUser = new User({
//       name: req.body.name,
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password,
//     });

//     User.createUser(newUser, function (err, user) {
//       if (err) {
//         console.log(err);
//         return res.status(400).json({ errors: err.array() });
//         throw err;
//       }
//       //res.send(user).end();

//       //jwt verification
//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };

//       jwt.sign(
//         payload,
//         config.get("jwtSecret"),
//         {
//           expiresIn: 360000,
//         },
//         (err, token) => {
//           console.log(token);
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     });
//   }
// });

// @route    POST api/users
// @desc     Test route
// @access   public

router.post(
  "/register",
  [
    check("name", "Name should not be empty").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("username", "Please enter a valid email").not().isEmpty(),
    check("password", "Please enter a password of min length 6").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, username, email, password } = req.body;

    try {
      //check if the user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        username,
        password,
      });

      //encrypting password

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //saving the user
      await user.save();

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

      // let token = jwt.sign({ uid: user.data.id }, process.env.SECRET_KEY, { expiresIn: '3h' });
      // res.json({ token: token })

      res.send("User registered");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);


router.post('/login', [
    
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
],
  async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
      }
      const {  email, password } = req.body
      try {
          let user = await User.findOne({ email })


          if (!user) {
              return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
          }

          const isMatch = await bcrypt.compare(password,user.password)
          
          if(!isMatch){
              return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
          
          }
          const payload = {
              user: {
                  id: user.id
              }
          }
          jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
              if (err) throw err;
              res.json({ token });
          })


      } catch (err) {
          console.log(err.message)
          res.status(500).send('Server Error')
      }


  })

// Endpoint to login
// router.post("/login", passport.authenticate("local"), function (req, res) {
//   res.send(req.user);
// });

// Endpoint to get current user
// router.get("/", function (req, res) {
//   res.send(req.user);
// });

// @route    GET api/auth
// @desc     Get user by token
// @access   private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to logout
router.get("/logout", function (req, res) {
  req.logout();
  res.send(null);
});

module.exports = router;
