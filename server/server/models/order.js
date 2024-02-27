const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider',
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  }],
  total_price: {
    type: Number,
    default: 0,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Preparing', 'On The Way', 'Delivered', 'Canceled'],
    default: 'Pending',
    required: true
  },
  estimatedTime:{
        type: Number,
        required: true
  },
  note: String
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema);
