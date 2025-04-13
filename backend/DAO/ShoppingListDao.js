const ShoppingList = require("../models/shoppingListModel");
const {validateListInput} = require("../DAO/validation");

// CREATE
async function createList(creator, items, title) {
    try {
        validateListInput(creator, items, title);

        const shoppingList = new ShoppingList({
            creator,
            items,
            title,
        });

        const savedList = await shoppingList.save();
        return savedList;
    } catch (err) {
        throw err;
    }
}


// GET ALL
async function getAllLists() {
    try {
        const allShoppingLists = await ShoppingList.find({});
        return allShoppingLists;
    } catch (err) {
        throw err;
    }
}


// EDIT
async function editList(id, updatedData) {
    try {
        if (updatedData.creator || updatedData.title || updatedData.items) {
            validateListInput(
                updatedData.creator || 'placeholder',
                updatedData.items || [{}],
                updatedData.title || 'placeholder'
            );
        }

        const updatedList = await ShoppingList.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true, runValidators: true }
        );

        if (!updatedList) {
            throw new Error('Shopping list not found');
        }

        return updatedList;
    } catch (err) {
        throw err;
    }
}


module.exports = {
    createList,
    getAllLists,
    editList,
};
