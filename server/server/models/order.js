const mongoose = requires('mongoose');

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  rider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider',
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  total_price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['in progress', 'completed'],
    default: 'in progress'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  },
  note: String,
  estimatedTime: Number //It will be like 50 Minutes
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
