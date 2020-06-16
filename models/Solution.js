const mongoose = require("mongoose");

const SolutionSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    description: {
        type: String,
        required: true
    },
    links: {
        type: String,
        required: true

    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    Accept: {
        type: Boolean,

    }



})
module.exports = Solution = mongoose.model('solution', SolutionSchema)
