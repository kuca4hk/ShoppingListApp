// shoppingListModel.js
const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema(
    {
        creator: {
            type: String,
            required: [true, 'Please add the creator name'],
            unique: true,
            maxLength: [50, 'Creator name cannot be more than 50 characters'],
        },
        title: {
            type: String,
            required: [true, 'Please add the shopping list title'],
            maxLength: [50, 'Title cannot be more than 50 characters'],
        },
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }]
    }, {
        timestamps: true,
    }
);

module.exports = mongoose.model('ShoppingList', shoppingListSchema);