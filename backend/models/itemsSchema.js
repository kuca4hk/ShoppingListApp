const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add the item name'],
        },
        quantity: {
            type: Number,
            required: [true, 'Please add the item quantity'],
        },
        marker: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = itemSchema;
