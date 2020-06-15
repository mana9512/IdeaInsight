const mongoose=require('mongoose')
  const ProfileSchema=new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

  })
  module.exports = ProfileSchema = mongoose.model('profile', ProfileSchema)
