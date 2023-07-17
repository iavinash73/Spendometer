const express = require('express')
const router = express.Router()
const {
  getSavings,
  setSaving,
  updateSaving,
  deleteSaving,
  addSaving,
} = require('../controllers/savingController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getSavings).post(protect, setSaving)
router.route('/:id').delete(protect, deleteSaving).put(protect, updateSaving)
router.route('/add/:id').put(protect, addSaving)

module.exports = router
