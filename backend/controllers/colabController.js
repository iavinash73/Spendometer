const asyncHandler = require("express-async-handler");
const Colab = require("../models/colabModel");
const User = require("../models/userModel");

//@description     Fetch all Colabs for a user
//@route           GET /api/colabs/
//@access          Protected
const fetchColabs = asyncHandler(async (req, res) => {
    try {
        // console.log("huh")
        // const colabs = await Colab.find({ user: req.user.id })
        // const results = Colab.find({ users: { $elemMatch: { $eq: req.user._id } } })
        const results = await Colab.find({ users: req.user.id })
            .populate("users", "-password")
            .populate("admin", "-password")
        res.status(200).send(results);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

//@description     Create New Colab
//@route           POST /api/colabs/create
//@access          Protected
const createColab = asyncHandler(async (req, res) => {
    // console.log(req.body)


    if (!req.body.email || !req.body.title) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }
    const email = req.body.email
    // console.log(email)
    const user = await User.findOne({ email });
    // console.log(user)
    try {
        // console.log(req.body)
        // Extract the title and session user (admin) from req.body and req.user
        const { title } = req.body;
        const admin = req.user._id;
        // Assuming the session user's _id is stored in req.user._id
        const users = []
        users.push(user._id)
        // const users = req.body.users.split(',');
        const { desc } = req.body;
        // console.log(desc)
        // Add the admin's _id to the users array
        users.push(admin);
        // console.log("here")
        // console.log(users)
        // Create the colab and populate the admin field
        const newColab = await Colab.create({ title, admin, users, desc });
        const populatedColab = await Colab.findById(newColab._id).populate("admin users");
        // console.log(populatedColab)
        res.status(201).json(populatedColab);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


// @desc    Delete colab
// @route   DELETE /api/colabs/delete/:id
// @access  Private
const deleteColab = asyncHandler(async (req, res) => {
    const CID = req.params.id
    const colab = await Colab.findById(CID)
    // console.log(CID)
    // console.log("here")
    if (!colab) {
        res.status(400)
        throw new Error('colab not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    await colab.remove()
    res.status(200).json({ id: req.params.id, msg: "deleted" })
})


// @desc    Rename Colab
// @route   PUT /api/colab/rename/:id
// @access  Protected
const renameColab = asyncHandler(async (req, res) => {
    const Id = req.params.id
    // console.log(Id)
    const { title, desc } = req.body;
    // console.log(req.body)
    const updatedColab = await Colab.findByIdAndUpdate(
        Id,
        {
            title: title,
            desc: desc,
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("admin", "-password");
    // console.log(updatedColab)

    if (!updatedColab) {
        res.status(404);
        throw new Error("Colab Not Found");
    }
    else {
        const results = await Colab.find({ users: req.user.id })
            .populate("users", "-password")
            .populate("admin", "-password")
        res.status(200).send(results);
    }
});


// @desc    Add user to Colab
// @route   PUT /api/colab/addUser/:id
// @access  Protected
const addToColab = asyncHandler(async (req, res) => {
    const Id = req.params.id
    const email = req.body.user;
    // console.log(req.body)
    // console.log(req.params.id)
    // console.log(email)
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }
    // console.log(user)
    // console.log(user._id)
    const added = await Colab.findByIdAndUpdate(
        Id,
        {
            $push: { users: user._id },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("admin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Colab Not Found");
    } else {
        const results = await Colab.find({ users: req.user.id })
            .populate("users", "-password")
            .populate("admin", "-password")
        res.status(200).send(results);
    }
});


// @desc    Remove user from Colab
// @route   PUT /api/colab/removeUser/:id
// @access  Protected
const removeFromColab = asyncHandler(async (req, res) => {
    const Id = req.params.id
    const { email } = req.body;
    const user = await User.findOne({ email });


    const removed = await Colab.findByIdAndUpdate(
        Id,
        {
            $pull: { users: user._id },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("admin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Colab Not Found");
    } else {
        const results = await Colab.find({ users: req.user.id })
            .populate("users", "-password")
            .populate("admin", "-password")
        res.status(200).send(results);
    }
});



// @desc    Add expense to Colab
// @route   PUT /api/colab/addExpense/:id
// @access  Protected
const addExpense = asyncHandler(async (req, res) => {
    // console.log("HEREEEE")
    if (!req.body) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    // console.log(req.body)
    final_data = {
        user: req.user.id,
        desc: req.body.desc,
        cost: req.body.cost,
        tag: req.body.tag,
        mode: req.body.mode,
        date: req.body.onlyDate,
    }
    // console.log(final_data)
    // console.log(req.params.id)
    const added = await Colab.findByIdAndUpdate(
        req.params.id,
        {
            $push: { expense: final_data },
        },
        {

            new: true,
        }
    )
    // .populate("expense", "-password")
    // const expense = await Expense.create(
    // Update total_expense in the Total model
    if (!added) {
        res.status(404);
        throw new Error("Colab Not Found");
    } else {
        const results = await Colab.find({ users: req.user.id })
            .populate("users", "-password")
            .populate("admin", "-password")
        res.status(200).send(results);
    }
})



// @desc    update expense in Colab
// @route   PUT /api/colab/updateExpense/:id
// @access  Protected
const updateExpense = asyncHandler(async (req, res) => {
    try {
        // console.log(req.body)
        const colabId = req.params.id;
        const expenseId = req.body.id;
        const updatedExpense = {
            user: req.user.id,
            desc: req.body.desc,
            cost: req.body.cost,
            tag: req.body.tag,
            mode: req.body.mode,
            date: req.body.date,
        };

        const colab = await Colab.findById(colabId);
        if (!colab) {
            res.status(404);
            throw new Error("Colab Not Found");
        }

        const expenseIndex = colab.expense.findIndex(exp => exp._id.toString() === expenseId);
        if (expenseIndex === -1) {
            res.status(404);
            throw new Error("Expense Not Found");
        }

        // Instead of directly updating and saving the colab, use findByIdAndUpdate
        await Colab.findByIdAndUpdate(
            colabId,
            { $set: { [`expense.${expenseIndex}`]: updatedExpense } },
            { new: true }
        );

        // Optionally, you can retrieve the updated document after updating
        // const updatedColab = await Colab.findById(colabId);
        // console.log("Updated Colab:", updatedColab);
        const results = await Colab.find({ users: req.user.id })
            .populate("users", "-password")
            .populate("admin", "-password")
        res.status(200).send(results);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});


// @desc    remove expense from Colab
// @route   PUT /api/colab/deleteExpense/:id
// @access  Protected
const removeExpense = asyncHandler(async (req, res) => {
    const colabId = req.params.id;
    const expenseId = req.body.expenseId;
    try {
        // console.log(colabId)
        // Use findByIdAndUpdate and the $pull operator to remove the expense from the array directly
        const updatedColab = await Colab.findByIdAndUpdate(
            colabId,
            { $pull: { expense: { _id: expenseId } } },
            { new: true }
        );

        if (!updatedColab) {
            return res.status(404).json({ error: 'Colab not found' });
        }
        // console.log(updatedColab)

        const results = await Colab.find({ users: req.user.id })
            .populate("users", "-password")
            .populate("admin", "-password")

        res.status(200).send(results);
    } catch (err) {
        console.error('Error removing expense:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = {
    fetchColabs,
    createColab,
    renameColab,
    addToColab,
    removeFromColab,
    deleteColab,
    addExpense,
    removeExpense,
    updateExpense
};
