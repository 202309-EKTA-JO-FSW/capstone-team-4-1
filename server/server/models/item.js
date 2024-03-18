const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
    },
    dishName: {
        type: String,
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
    totalPrice: {
      type: Number,
      default: 0,
      required: true
    },
    note: {
      type: String,
    },
    state: {
      type: String,
        enum: ['order', 'delivered'],
        default: 'order',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);