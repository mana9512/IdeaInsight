const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const config = require('config')
const passport = require('passport');
const jwt= require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const flash = require('connect-flash');




// var GoogleStrategy =  require('passport-google-oauth20').Strategy;

// const isLoggedIn = (req, res, next) => {
//     if (req.user) {
//         next();
//     } else {
//         res.sendStatus(401);
//     }
// }
// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(null, user);
//     });
// });

// passport.use(new GoogleStrategy({
//     clientID: config.get('google-ClientID'),
//     clientSecret: config.get('google-ClientSecret'),
//     callbackURL: "http://localhost:5000/api/auth/google/callback"
// },

//     function (accessToken, refreshToken, profile, done) {
//         console.log(profile);
//         console.log(accessToken);
//         //check user table for anyone with a facebook ID of profile.id
//         User.findOne({
//             googleId: profile.id
//         }, function (err, user) {
//             if (err) {
//                 return done(err);
//             }
//             //No user was found... so create a new user with values from Facebook (all the profile. stuff)
//             if (!user) {
//                 user = new User({
//                     'google.id': profile.id,
//                     'google.name': profile.displayName,
//                     'google.email': profile.emails[0].value,
//                     'google.token': accessToken
//                 });
//                 user.save(function (err) {
//                     if (err) console.log(err);
//                     return done(err, user);
//                 });
//             } else {
//                 //found user. Return
//                 return done(err, user);
//             }
//         });
//     }
// ));
// router.get('/', (req, res) => res.send('Example Home page!'))

// router.get('/failed', (req, res) => res.send('Failed to login'))
// router.get('/good', (req, res) => res.send('Welcome'))


// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), function (req, res) {
//     res.redirect('/api/auth/good');
// });
// router.get('/logout', (req, res) => {
//     req.session = null;
//     req.logout();
//     res.redirect('/');
// })

const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
     	if(isMatch){
     	  return done(null, user);
     	} else {
     	  return done(null, false, {message: 'Invalid password'});
     	}
     });
   });
  }
));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
router.post('/register', function(req, res){
    var password = req.body.password;
    var password2 = req.body.password2;
  
    if (password == password2){
      var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      });
  
      User.createUser(newUser, function(err, user){
        if(err) throw err;
        res.send(user).end()
      });
    } else{
      res.status(500).send("{errors: \"Passwords don't match\"}").end()
    }
  });
  
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.send(req.user);
  }
);



// Endpoint to get current user
router.get('/user', function(req, res){
  res.send(req.user);
})


// Endpoint to logout
router.get('/logout', function(req, res){
  req.logout();
  res.send(null)
});
module.exports = router