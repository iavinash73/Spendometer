const mongoose = require('mongoose')

const savingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a Title'],
    },
    target: {
      type: Number,
      required: [true, 'Please add your Target']
    },
    deadline: {
      type: String,
      required: [true]
    },
    savedAmount: {
      type: Number,
      required: [true]
    },
    isDone : {
        type:Boolean,
        require: [true]
    },
   
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Saving', savingSchema)
