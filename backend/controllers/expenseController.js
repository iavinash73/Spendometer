const asyncHandler = require('express-async-handler')
const Total = require('../models/totalModel')
const Expense = require('../models/expenseModel')
const User = require('../models/userModel')

// @desc    Get expenses
// @route   GET /api/expenses
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id })
  const totalExpense = await Total.find({ user: req.user.id })
  const total = totalExpense[0]
  // console.log(total)
  res.status(200).json({ expenses, total })
})

// @desc    Set expense
// @route   POST /api/expenses
// @access  Private
const setExpense = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  const expense = await Expense.create({
    user: req.user.id,
    desc: req.body.desc,
    cost: req.body.cost,
    tag: req.body.tag,
    mode: req.body.mode,
    date: req.body.onlyDate,
  })

  // Update total_expense in the Total model
  await Total.findOneAndUpdate(
    { user: req.user.id },
    { $inc: { total_expense: req.body.cost } },
    { new: true }
  )

  const totalExpense = await Total.find({ user: req.user.id })
  const total = totalExpense[0].total_expense

  res.status(200).json({ expense, total })
})


// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id)
  oldCost = expense.cost
  if (!expense) {
    res.status(400)
    throw new Error('Expense not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the expense user
  if (expense.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const { desc, cost, tag, mode ,date} = req.body;

  await Expense.findByIdAndUpdate(req.params.id, { cost: cost, desc: desc, tag: tag, mode: mode ,date:date })
  await Total.findOneAndUpdate(
    { user: req.user.id },
    { $inc: { total_expense: + cost - oldCost} },
    { new: true }
  ) 
  const expenses = await Expense.find({ user: req.user.id })
  const totalExpense = await Total.find({ user: req.user.id })
  const total = totalExpense[0].total_expense
  res.status(200).json({ expenses, total })
})

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id)

  if (!expense) {
    res.status(400)
    throw new Error('Expense not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the expense user
  if (expense.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  const { cost } = req.body;
  // console.log(cost)
  await Total.findOneAndUpdate(
    { user: req.user.id },
    { $inc: { total_expense: - cost } },
    { new: true }
  )
  await expense.remove()
  const totalExpense = await Total.find({ user: req.user.id })
  const total = totalExpense[0].total_expense

  res.status(200).json({ id: req.params.id, total })
})

module.exports = {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
}
