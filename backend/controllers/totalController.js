// const asyncHandler = require('express-async-handler')
// const Total = require('../models/totalModel')
// const User = require('../models/userModel')
// const Expense = require('../models/expenseModel')

// // @desc    Get expenses
// // @route   GET /api/expenses
// // @access  Private
// const getTotals = asyncHandler(async (req, res) => {
//   const totals = await Total.find({ user: req.user.id })
//   res.status(200).json(totals)
// })

// // @desc    Set expense
// // @route   POST /api/expenses
// // @access  Private
// const setTotal = asyncHandler(async (req, res) => {
//   const total = await Total.findOneAndUpdate(
//     { user: req.user.id },
//     { $inc: { total_expense: req.body.cost } },
//     { new: true }
//   )
//   res.status(200).json(total)
// })

// // @desc    Update expense
// // @route   PUT /api/expenses/:id
// // @access  Private
// const updateTotal = asyncHandler(async (req, res) => {
//   const expense = await Expense.findById(req.params.id)

//   if (!expense) {
//     res.status(400)
//     throw new Error('Expense not found')
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

//   // Make sure the logged in user matches the expense user
//   if (expense.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

//   const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   })

//   res.status(200).json(updatedExpense)
// })

// // @desc    Delete expense
// // @route   DELETE /api/expenses/:id
// // @access  Private
// const deleteTotal = asyncHandler(async (req, res) => {
//   const expense = await Expense.findById(req.params.id)

//   if (!expense) {
//     res.status(400)
//     throw new Error('Expense not found')
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

//   // Make sure the logged in user matches the expense user
//   if (expense.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

//   await expense.remove()

//   res.status(200).json({ id: req.params.id })
// })

// module.exports = {
//   setTotal,
//   getTotals,
//   updateTotal,
//   deleteTotal
// }
