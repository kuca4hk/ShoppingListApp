const express = require("express");
const {
    createShoppingList,
    getMyCreatedShoppingLists,
    getShoppingListsUsers,
    updateShoppingList,
    deleteShoppingList,
} = require('../controllers/shoppingListController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();
router.post('/', validateToken, createShoppingList);
router.get('/', validateToken, getMyCreatedShoppingLists);
router.get('/users', validateToken, getShoppingListsUsers);
router.put('/:id', validateToken, updateShoppingList);
router.delete('/:id', validateToken, deleteShoppingList);
module.exports = router;

