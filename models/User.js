const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  twitter: {
    id: String,
    name: String,
    email: String,
    token: String,
  },
  linkedIn: {
    id: String,
    name: String,
    email: String,
    token: String,
  },
  google: {
    id: String,
    name: String,
    email: String,
    token: String,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
