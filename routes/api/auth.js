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

module.exports = router