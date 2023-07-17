const mongoose = require('mongoose')

const totalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        total_expense: {
            type: Number,
            required: [false],
        },
        total_saving: {
            type: Number,
            required: [false]
        },
        total_bill: {
            type: Number,
            required: [false]
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Total', totalSchema)
