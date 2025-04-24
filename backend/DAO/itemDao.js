const Item = require("../models/itemsModel");
const { validateItemInput } = require("../DAO/validation");
const mongoose = require("mongoose");


async function createItem(name, quantity) {
    try {
        validateItemInput(name, quantity);

        const newItem = await Item.create({ name, quantity});
        return newItem;
    } catch (err) {
        throw err;
    }
}

async function getAllItems() {
    try {
        const items = await Item.find({});
        return items;
    } catch (err) {
        throw err;
    }
}

async function toggleItemMarker(id) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid item ID");
        }

        const item = await Item.findById(id);
        if (!item) {
            throw new Error("Item not found");
        }

        item.marker = !item.marker;
        await item.save();

        return item;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createItem,
    getAllItems,
    toggleItemMarker,
};
