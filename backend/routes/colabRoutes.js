const express = require("express");
const {
  fetchColabs,
  createColab,
  renameColab,
  removeFromColab,
  addToColab,
  deleteColab,
  addExpense,
  removeExpense,
  updateExpense
} = require("../controllers/colabController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, fetchColabs); //done
router.route("/create").post(protect, createColab); //done
router.route("/delete/:id").delete(protect, deleteColab); //done and sends back id of deleted colab so it's removed from the global state
router.route("/rename/:id").put(protect, renameColab); //renames and does fetch and sends back all the colabs and updates global colabs array
router.route("/addUser/:id").put(protect, addToColab); //adds user to the users array and sends back all the colabs back
router.route("/removeUser/:id").put(protect, removeFromColab); //removes user from users array and sends back all the colabs back
router.route("/addExpense/:id").put(protect, addExpense);  //adds the expense uder the specific colab and user the session user
router.route("/updateExpense/:id").put(protect, updateExpense); 
router.route("/deleteExpense/:id").put(protect, removeExpense);

module.exports = router;
