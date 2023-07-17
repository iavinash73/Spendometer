const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    desc: {
      type: String,
      required: [true, 'Please add a description'],
    },
    cost: {
      type: Number,
      required: [true, 'Please add your expense']
    },
    tag: {
      type: String,
      required: [true, 'Please mention the type']
    },
    mode: {
      type: String,
      required: [false]
    },
    date: {
      type: String,
      required: [true]
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Expense', expenseSchema)
