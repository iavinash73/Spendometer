const express = require('express')
const router = express.Router()
const {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getExpenses).post(protect, setExpense)
router.route('/:id').delete(protect, deleteExpense).put(protect, updateExpense)

module.exports = router
