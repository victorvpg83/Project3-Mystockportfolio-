const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Value = require("./Value.model")
const CloseValue = require("./CloseValue.model")

const userSchema = new Schema({
  username: String,
  password: String,
  initI: Number,
  cartera: [{type: Schema.Types.ObjectId, ref: 'Value'}],
  registroOP: [{type: Schema.Types.ObjectId, ref: 'CloseValue'}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
