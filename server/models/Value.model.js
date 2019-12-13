const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const valueSchema = new Schema({
    symbol: String,
    buyPrice: Number,
    qty: Number
}, {
    timestamps: true
})

const Value = mongoose.model('Value', valueSchema);
module.exports = Value;