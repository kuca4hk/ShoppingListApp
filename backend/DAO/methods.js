const ShoppingList = require("../models/shoppingListModel");

function createList(creator, items, title) {
    return new Promise((resolve, reject) => {
        const shoppingList = new ShoppingList({
            creator,
            items,
            title,
        });

        shoppingList.save((err, savedList) => {
            if (err) {
                reject(err);
            } else {
                resolve(savedList);
            }
        });
    });
}

function getAllLists() {
    return new Promise((resolve, reject) => {
        ShoppingList.find({}, (err, allShoppingLists) => {
            if (err) {
                reject(err);
            } else {
                resolve(allShoppingLists);
            }
        });
    });
}

function editList(id, updatedData) {
    return new Promise((resolve, reject) => {
        ShoppingList.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true, runValidators: true },
            (err, updatedList) => {
                if (err) {
                    reject(err);
                } else if (!updatedList) {
                    reject(new Error('Shopping list not found'));
                } else {
                    resolve(updatedList);
                }
            }
        );
    });
}


module.exports = {
    createList,
    getAllLists,
    editList,
}


