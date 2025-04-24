const asyncHandler = require("express-async-handler");
const {
    VALIDATION_ERROR,
    NOT_FOUND,
} = require("../config/constants");

const {
    createItem,
    getAllItems,
    toggleItemMarker,
} = require("../dao/itemDao");

const createItemHandler = asyncHandler(async (req, res) => {
    const { name, quantity, price } = req.body;

    try {
        const item = await createItem(name, quantity, price);
        res.status(201).json(item);
    } catch (err) {
        res.status(VALIDATION_ERROR).json(
            {
                message: err.message,
            }
        );
    }
});

const getAllItemsHandler = asyncHandler(async (req, res) => {
    const items = await getAllItems();

    if (!items || items.length === 0) {
        res.status(NOT_FOUND).json(
            {
                message: "No items found",
            }
        );
    }

    res.status(200).json(items);
});

const markerItemHandler = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const item = await toggleItemMarker(id);
        res.status(200).json(item);
    } catch (err) {
        res.status(VALIDATION_ERROR).json(
            {
                message: err.message,
            }
        )
    }
});

module.exports = {
    createItemHandler,
    getAllItemsHandler,
    markerItemHandler,
};
