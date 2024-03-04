const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title required']
  },
  description: {
    type: String,
    required: [true, 'Description required']
  },
  image: {
    type: String,
    required: [true, 'Image required']
  },
  price: {
    type: Number,
    required: [true, 'Price required']
  },
  category: String
}, { timestamps: true });

module.exports = mongoose.model("Dish", dishSchema);