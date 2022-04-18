const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    idCanDo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'CanDo'
    },
    answers: [
      {
        idAnswerSelected: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Exercise'
        },
        idQuestion: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Exercise'
        },
        idExercise: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Exercise'
        },
        initialTime: {
          type: String,
          required: true
        },
        finalTime: {
          type: String,
          required: true
        }
      }
    ],
    createdDate: {
      type: Date,
      required: true,
      default: Date.now
    }
  }
)

module.exports = mongoose.model('Report', reportSchema)