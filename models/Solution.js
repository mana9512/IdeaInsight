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
    type: Buffer,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        require: true,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  Accept: {
    type: Boolean,
  },
});
module.exports = Solution = mongoose.model("solution", SolutionSchema);
