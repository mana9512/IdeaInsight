const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SolutionSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  idea: {
    type: Schema.Types.ObjectId,
    ref: "idea",
  },
  description: {
    type: String,
    required: true,
  },
  links: {
    type: String,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  Accept: {
    type: Boolean,
  },
});
module.exports = Solution = mongoose.model("solution", SolutionSchema);
