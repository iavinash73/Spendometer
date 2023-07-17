const mongoose = require('mongoose')
const billSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true]
    },
    cost: {
      type: Number,
      required: [true]
    },
    duration: {
      type: Number,
      required: [true]
    },
    startingDate: {
      type: String,
      required: [false]
    },
    status: {
      type: Boolean,
      required: [true]
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Bill', billSchema)
