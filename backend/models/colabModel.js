const mongoose = require("mongoose");

const colabModel = mongoose.Schema(
  {
    title: { type: String, trim: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    desc: {
      type: String,
      required: [true, 'Please add a description'],
    },
    expense: [{
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
    }],
    totalExpense: { type: Number },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Colab", colabModel);