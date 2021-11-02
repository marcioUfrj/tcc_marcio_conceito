const mongoose = require('mongoose');

const canDoSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lesson: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('CanDo', canDoSchema)