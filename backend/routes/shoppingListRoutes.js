const express = require("express");
const {
    createShoppingList,
    getAllShoppingLists,
    editShoppingList,
    deleteShoppingList
} = require('../controllers/shoppingListController');

const router = express.Router();
router.post('/', createShoppingList);
router.get('/', getAllShoppingLists);
router.put('/:id', editShoppingList);
router.delete('/:id', deleteShoppingList);


module.exports = router;

