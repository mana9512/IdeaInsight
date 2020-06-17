const mongoose = require("mongoose");
require("mongoose-type-url");
const Schema = mongoose.Schema;

const SolutionSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  links: {
    work: mongoose.SchemaTypes.Url,
    profile: mongoose.SchemaTypes.Url,
    //type: String,
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
