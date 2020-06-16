const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IdeaSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag:  {
    type: [String],
    required: true,
  },
  avatar: {
    type: String,
  },
  solution: [
    {
      type: Schema.Types.ObjectId,
      ref: "Solution",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Idea = mongoose.model("idea", IdeaSchema);
