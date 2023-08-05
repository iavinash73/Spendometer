const asyncHandler = require('express-async-handler')
const Total = require('../models/totalModel')
const Bill = require('../models/billModel')
const User = require('../models/userModel')

// @desc    Get bills
// @route   GET /api/bills
// @access  Private
const getBills = asyncHandler(async (req, res) => {
  const bills = await Bill.find({ user: req.user.id })
  const totalBill = await Total.find({ user: req.user.id })
  const total = totalBill[0]
  res.status(200).json({ bills, total })
})

// @desc    Set bill
// @route   POST /api/bills
// @access  Private
const setBill = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  // console.log(req.body)
  const bill = await Bill.create({
    user: req.user.id,
    title: req.body.title,
    cost: req.body.cost,
    duration: req.body.duration,
    startingDate: req.body.onlyDate,
    status: req.body.status
  })

  // Update total_bill in the Total model
  await Total.findOneAndUpdate(
    { user: req.user.id },
    { $inc: { total_bill: req.body.cost } },
    { new: true }
  )

  const totalBill = await Total.find({ user: req.user.id })
  const total = totalBill[0].total_bill

  res.status(200).json({ bill, total })
})


// @desc    Update bill
// @route   PUT /api/bills/:id
// @access  Private
const updateBill = asyncHandler(async (req, res) => {
  const bill = await Bill.findById(req.params.id)
  oldCost = bill.cost;
  oldStatus = bill.status
  if (!bill) {
    res.status(400)
    throw new Error('Bill not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the bill user
  if (bill.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const { title,cost,duration,date,status} = req.body;

  await Bill.findByIdAndUpdate(req.params.id, { title:title,cost: cost, duration: duration,startingDate:date, status:status })
  
  if(oldCost !== cost && status==true){
    await Total.findOneAndUpdate(
      { user: req.user.id },
      { $inc: { total_bill: + cost - oldCost} },
      { new: true }
    ) 
  }
  else if(oldStatus == true && status == false){
    await Total.findOneAndUpdate(
      { user: req.user.id },
      { $inc: { total_bill: - cost} },
      { new: true }
    ) 
  }
  else if(oldStatus == false && status == true){
    await Total.findOneAndUpdate(
      { user: req.user.id },
      { $inc: { total_bill: + cost} },
      { new: true }
    ) 
  }
  
  const bills = await Bill.find({ user: req.user.id })
  const totalBill = await Total.find({ user: req.user.id })
  const total = totalBill[0].total_bill
  res.status(200).json({ bills, total })
})

// @desc    Delete bill
// @route   DELETE /api/bills/:id
// @access  Private
const deleteBill = asyncHandler(async (req, res) => {
  const bill = await Bill.findById(req.params.id)

  if (!bill) {
    res.status(400)
    throw new Error('Bill not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the bill user
  if (bill.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  const { cost } = req.body;
  // console.log(cost)
  await Total.findOneAndUpdate(
    { user: req.user.id },
    { $inc: { total_bill: - cost } },
    { new: true }
  )
  await bill.remove()
  const totalBill = await Total.find({ user: req.user.id })
  const total = totalBill[0].total_bill

  res.status(200).json({ id: req.params.id, total })
})

module.exports = {
  getBills,
  setBill,
  updateBill,
  deleteBill,
}
