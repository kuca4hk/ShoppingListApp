const asyncHandler = require("express-async-handler");
const ShoppingList = require("../models/shoppingListModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const createShoppingList = asyncHandler(async (req, res) => {
        const { title, items, users } = req.body;

        // Find all relevant user objects based on the provided emails
        const userObjects = await Promise.all(users.map(async ({ email }) => {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(404);
                throw new Error(`User with email ${email} not found`);
            }
            return user._id;
        }));

        // Create a new shopping list
        const shoppingList = await ShoppingList.create({
            title,
            items,
            users: userObjects,
            creator: req.user.id,
        });

        if (shoppingList) {
            res.status(201).json(shoppingList);
        } else {
            res.status(400);
            throw new Error("Invalid shopping list data");
        }
});

const getMyCreatedShoppingLists = asyncHandler(async (req, res) => {
    try {

        const shoppingLists = await ShoppingList.find({ creator: req.user.id })
            .populate('creator', '_id email')
            .lean();

        res.json(shoppingLists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
// TODO - not working
const getShoppingListsUsers = asyncHandler(async (req, res) => {
    try {
        const shoppingLists = await ShoppingList.find({ users: req.user.id })
        res.json(shoppingLists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateShoppingList = asyncHandler(async (req, res) => {
    try {
        const { title, items, users } = req.body;
        const shoppingList = await ShoppingList.findById({
            _id: req.params.id,
            creator: req.user.id,
        });
        if (shoppingList) {
            shoppingList.title = title;
            shoppingList.items = items;
            shoppingList.users = users;
            const updatedShoppingList = await shoppingList.save();
            res.json(updatedShoppingList);
        } else {
            res.status(404);
            throw new Error("Shopping list not found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deleteShoppingList = asyncHandler(async (req, res) => {
    try {
        const shoppingList = await ShoppingList.findById({
            _id: req.params.id,
            creator: req.user.id,
        });
        if (shoppingList) {
            await shoppingList.remove();
            res.json({ message: "Shopping list removed" });
        } else {
            res.status(404);
            throw new Error("Shopping list not found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    createShoppingList,
    getMyCreatedShoppingLists,
    getShoppingListsUsers,
    updateShoppingList,
    deleteShoppingList,
};
