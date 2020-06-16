const express = require("express");
const router = express.Router();

function isAuthenticated(req, res, next) {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  //console.log(req.user);
  
  if (req.isAuthenticated()) return next();
  if(req.user) return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect("/");
}

module.exports = isAuthenticated;
