const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: String
}, { timestamps: true });

const itemSchema = new mongoose.Schema({
  dish: [dishSchema],
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
module.exports = mongoose.model("Dish", dishSchema);