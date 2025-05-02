const {getAllLists, createList, editList, deleteList} = require("../DAO/ShoppingListDao");

const asyncHandler = require("express-async-handler");
const ShoppingList = require("../models/shoppingListModel");
const mongoose = require("mongoose");
const {
    VALIDATION_ERROR,
    NOT_FOUND,
} = require("../config/constants");


// @desc    Create new shopping list
// @route   POST /api/shopping-lists
const createShoppingList = asyncHandler(async (req, res) => {
    const { creator, title, items } = req.body;

    try {
        const shoppingList = await createList(creator, items, title);
        res.status(201).json(shoppingList);
    } catch (err){
        res.status(VALIDATION_ERROR).json({
            message: err.message,
        })

    }

});

// @desc    Get all shopping lists
// @route   GET /api/shopping-lists
const getAllShoppingLists = asyncHandler(async (req, res) => {

    try {
        const allShoppingLists = await getAllLists();
        res.status(200).json(allShoppingLists);
    } catch (err) {
        res.status(NOT_FOUND).json({
            message: "No shopping lists found",
        });
    }
});

// @desc    Edit shopping list
// @route   PUT /api/shopping-lists/:id
const editShoppingList = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { creator, title, items } = req.body;

    try {
        const updatedList = await editList(id, { creator, title, items });
        res.status(200).json(updatedList);
    } catch (err) {
        if (err.message === "Shopping list not found") {
            res.status(NOT_FOUND).json({
                message: err.message,
            });
        } else {
            res.status(VALIDATION_ERROR).json({
                message: err.message,
            });
        }
        throw err;
    }
});

// @desc    Delete shopping list
// @route   DELETE /api/shopping-lists/:id

const deleteShoppingList = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedList = await deleteList(id);
        res.status(200).json(deletedList);
    } catch (err) {
        if (err.message === "Shopping list not found") {
            res.status(NOT_FOUND).json({
                message: err.message,
            });
        } else {
            res.status(VALIDATION_ERROR).json({
                message: err.message,
            });
        }
        throw err;
    }
})
module.exports = {
    createShoppingList,
    getAllShoppingLists,
    editShoppingList,
    deleteShoppingList
};
