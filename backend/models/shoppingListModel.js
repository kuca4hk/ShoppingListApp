const mongoose = require('mongoose');
const itemSchema = require('./itemsModel');


const shoppingListSchema = new mongoose.Schema(
    {
        creator: {
            type: String,
            required: [true, 'Please add the creator name'],
            maxLength: [50, 'Creator name cannot be more than 50 characters'],
        },
        title: {
            type: String,
            required: [true, 'Please add the shopping list title'],
            maxLength: [50, 'Title cannot be more than 50 characters'],
        },
        items: {
            type: [itemSchema],
            validate: [
                {
                    validator: function (value) {
                        return value.length > 0;
                    },
                    message: 'Please add at least one item to the shopping list',
                },
            ],
        },
    },{
        timestamps: true,
    }
)

module.exports = mongoose.model('ShoppingList', shoppingListSchema);