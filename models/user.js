const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  nivelCEFR: {
    type: String,
    required: true
  },
  nivelJLPT: {
    type: String,
    required: true
  },
  nivelShirai: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  loginId: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)