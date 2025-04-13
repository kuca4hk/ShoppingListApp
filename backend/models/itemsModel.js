const mongoose = require('mongoose');
const itemSchema = require('./itemsSchema')

module.exports = mongoose.model('Item', itemSchema);
