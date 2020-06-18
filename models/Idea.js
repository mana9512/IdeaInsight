const mongoose = require("mongoose");
const Solution = require("./Solution");
const Schema = mongoose.Schema;

const IdeaSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: [String],
    required: true,
  },
  avatar: {
    type: Buffer,
  },
  solution: [
    {
      type: Schema.Types.ObjectId,
      ref: "Solution",
      // autopopulate: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Idea = mongoose.model("idea", IdeaSchema);
// IdeaSchema.plugin(require("mongoose-autopopulate"));
