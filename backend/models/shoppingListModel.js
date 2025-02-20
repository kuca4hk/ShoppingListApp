const mongoose = require('mongoose');


const shoppingListSchema = mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add the shopping list title'],
        },
        items: [
            {
                name: {
                    type: String,
                    required: [true, 'Please add the item name'],
                },
                quantity: {
                    type: Number,
                    required: [true, 'Please add the item quantity'],
                },
            },
        ],
        users: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ]
    }
)

module.exports = mongoose.model('ShoppingList', shoppingListSchema);