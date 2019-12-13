const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const valueSchema = new Schema({
    symbol: String,
    buyPrice: Number,
    qty: Number,
    sellPrice: Number,
    comision: Number,
    bruto: Number,
    neto: Number
}, {
    timestamps: true
})

const CloseValue = mongoose.model('CloseValue', valueSchema);
module.exports = CloseValue;