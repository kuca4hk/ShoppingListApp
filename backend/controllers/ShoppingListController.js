const {getAllLists, createList, editList} = require("../DAO/ShoppingListDao");

const asyncHandler = require("express-async-handler");
const ShoppingList = require("../models/shoppingListModel");
const mongoose = require("mongoose");
const {
    VALIDATION_ERROR,
    NOT_FOUND,
    SERVER_ERROR
} = require("../config/constants");


// @desc    Create new shopping list
// @route   POST /api/shopping-lists
const createShoppingList = asyncHandler(async (req, res) => {
    const { creator, title, items } = req.body;

    if (!title || title.length > 50) {
        res.status(VALIDATION_ERROR);
        throw new Error("Title is required and must be under 50 characters");
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(VALIDATION_ERROR);
        throw new Error("At least one item is required in the shopping list");
    }

    const shoppingList = await createList(creator, items, title);

    res.status(201).json(shoppingList);
});

// @desc    Get all shopping lists
// @route   GET /api/shopping-lists
const getAllShoppingLists = asyncHandler(async (req, res) => {
    const allShoppingLists = await getAllLists();

    if (!allShoppingLists || allShoppingLists.length === 0) {
        res.status(NOT_FOUND);
        throw new Error("No shopping lists found");
    }



    res.status(200).json(allShoppingLists);
});

// @desc    Edit shopping list
// @route   PUT /api/shopping-lists/:id
const editShoppingList = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { creator, title, items } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(VALIDATION_ERROR);
        throw new Error("Invalid shopping list ID");
    }

    if (title && title.length > 50) {
        res.status(VALIDATION_ERROR);
        throw new Error("Title must be under 50 characters");
    }

    try {
        const updatedList = await editList(id, { creator, title, items });
        res.status(200).json(updatedList);
    } catch (err) {
        if (err.message === "Shopping list not found") {
            res.status(NOT_FOUND);
        } else {
            res.status(VALIDATION_ERROR);
        }
        throw err;
    }
});

module.exports = {
    createShoppingList,
    getAllShoppingLists,
    editShoppingList,
};
