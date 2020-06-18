const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Comment = mongoose.model("comment", CommentSchema);
