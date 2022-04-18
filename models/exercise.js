const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  index_val: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [
    {
      question: {
        type: String,
        required: true
      },
      answers: [
        { 
          text: { type: String, required: true }, 
          correct: { type: Boolean, required: true } 
        }
      ]
    }
  ],
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  cando_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'CanDo'
  }
})

module.exports = mongoose.model('Exercise', exerciseSchema)