const express = require("express");
const {
    createShoppingList,
    getAllShoppingLists,
    editShoppingList,
} = require('../controllers/shoppingListController');
const router = express.Router();
router.post('/', createShoppingList);
router.get('/', getAllShoppingLists);
router.put('/:id', editShoppingList);

module.exports = router;

