const mongoose = require('mongoose');
const itemSchema = require('./itemsSchema'); // Import schématu

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
