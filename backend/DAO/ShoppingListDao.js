const ShoppingList = require("../models/shoppingListModel");
const Item = require("../models/itemsModel");
const { validateListInput } = require("../DAO/validation");
const mongoose = require("mongoose");

// CREATE
async function createList(creator, items, title) {
    try {
        validateListInput(creator, items, title);

        const createdItems = await Item.insertMany(items);
        const itemIds = createdItems.map(item => item._id);

        const shoppingList = new ShoppingList({
            creator,
            items: itemIds,
            title,
        });

        const savedList = await shoppingList.save();
        return await ShoppingList.findById(savedList._id).populate('items');
    } catch (err) {
        if (createdItems) {
            await Item.deleteMany({ _id: { $in: itemIds } });
        }
        throw err;
    }
}

// GET ALL
async function getAllLists() {
    try {
        const allShoppingLists = await ShoppingList.find({}).populate('items');
        return allShoppingLists;
    } catch (err) {
        throw err;
    }
}


// EDIT
async function editList(id, updatedData) {
    try {
        const list = await ShoppingList.findById(id).populate('items');
        if (!list) {
            throw new Error('Shopping list not found');
        }

        const validationData = {
            creator: updatedData.creator || list.creator,
            title: updatedData.title || list.title,
            items: updatedData.items || list.items
        };

        validateListInput(
            validationData.creator,
            validationData.items,
            validationData.title
        );

        if (updatedData.items) {
            await Item.deleteMany({ _id: { $in: list.items.map(i => i._id) } });

            const createdItems = await Item.insertMany(updatedData.items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                marker: item.marker || false
            })));

            updatedData.items = createdItems.map(item => item._id);
        }

        const updatedList = await ShoppingList.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true, runValidators: true }
        ).populate('items');

        return updatedList;
    } catch (err) {
        throw err;
    }
}

// DELETE
async function deleteList(id) {
    try {
        const list = await ShoppingList.findById(id);
        if (!list) {
            throw new Error('Shopping list not found');
        }

        // 1. Smazat všechny přidružené položky
        await Item.deleteMany({ _id: { $in: list.items } });

        // 2. Smazat samotný seznam
        await ShoppingList.findByIdAndDelete(id);

        return { message: 'Shopping list deleted successfully' };
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createList,
    getAllLists,
    editList,
    deleteList
};