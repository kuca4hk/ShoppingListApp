const {createItemHandler, getAllItemsHandler, markerItemHandler} = require("../controllers/itemsController");
const express = require("express");


const router = express.Router();
router.post('/', createItemHandler);
router.get('/', getAllItemsHandler);
router.put('/:id', markerItemHandler);

module.exports = router;