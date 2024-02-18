const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  dish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish',
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    required: true
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  note: String
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);