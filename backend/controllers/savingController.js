const asyncHandler = require('express-async-handler')
const Total = require('../models/totalModel')
const Saving = require('../models/savingModel')
const User = require('../models/userModel')

// @desc    Get savings
// @route   GET /api/savings
// @access  Private
const getSavings = asyncHandler(async (req, res) => {
  const savings = await Saving.find({ user: req.user.id })
  const totalSaving = await Total.find({ user: req.user.id })
  const total = totalSaving[0].total_saving
  res.status(200).json({ savings, total })
})

// @desc    Set saving
// @route   POST /api/savings
// @access  Private
const setSaving = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  const saving = await Saving.create({
    user: req.user.id,
    title: req.body.title,
    target: req.body.target,
    deadline: req.body.onlyDate,
    savedAmount: 0,
    isDone: false,
  })

  // Update total_saving in the Total model
  // await Total.findOneAndUpdate(
  //   { user: req.user.id },
  //   { $inc: { total_saving: req.body.savedAmount } },
  //   { new: true }
  // )

  // const totalSaving = await Total.find({ user: req.user.id })
  // const total = totalSaving[0].total_saving

  res.status(200).json({ saving })
})


// @desc    Update saving
// @route   PUT /api/savings/:id
// @access  Private
const updateSaving = asyncHandler(async (req, res) => {
  let saving = await Saving.findById(req.params.id)
  if (!saving) {
    res.status(400)
    throw new Error('Saving not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the saving user
  if (saving.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const { title, target, deadline } = req.body;

  await Saving.findByIdAndUpdate(req.params.id, { title: title, target: target, deadline: deadline })
  
  saving = await Saving.findById(req.params.id)
  if (saving.target >= saving.savedAmount) {
    await Saving.findByIdAndUpdate(req.params.id, { isDone: false})
  }
  const savings = await Saving.find({ user: req.user.id })
  res.status(200).json({ savings })
})


const addSaving = asyncHandler(async (req, res) => {
  let saving = await Saving.findById(req.params.id)
  if (!saving) {
    res.status(400)
    throw new Error('Saving not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the saving user
  if (saving.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const { sav } = req.body;
  // console.log(req.params.id)
  // const savings = await Saving.find({ user: req.user.id })
  await Saving.findByIdAndUpdate(req.params.id, { $inc: { savedAmount: + sav } }, { isDone: false })
  await Total.findOneAndUpdate(
    { user: req.user.id },
    { $inc: { total_saving: + sav } },
    { new: true }
  )
  saving = await Saving.findById(req.params.id)
  const totalSaving = await Total.find({ user: req.user.id })
  const total = totalSaving[0].total_saving
  if (saving.target <= saving.savedAmount) {
    await Saving.findByIdAndUpdate(req.params.id, { isDone: true })
  }
  const savings = await Saving.find({ user: req.user.id })
  res.status(200).json({ savings, total })
})




// @desc    Delete saving
// @route   DELETE /api/savings/:id
// @access  Private
const deleteSaving = asyncHandler(async (req, res) => {

  const saving = await Saving.findById(req.params.id)

  if (!saving) {
    res.status(400)
    throw new Error('Saving not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the saving user
  if (saving.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const { savedAmount } = req.body;

  // console.log(cost)
  await Total.findOneAndUpdate(
    { user: req.user.id },
    { $inc: { total_saving: - savedAmount } },
    { new: true }
  )
  await saving.remove()
  const totalSaving = await Total.find({ user: req.user.id })
  const total = totalSaving[0].total_saving

  res.status(200).json({ id: req.params.id, total })
})

module.exports = {
  getSavings,
  setSaving,
  updateSaving,
  deleteSaving,
  addSaving,
}
