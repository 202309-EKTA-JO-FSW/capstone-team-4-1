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
  totalPrice: {
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
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    validate: {
        validator: function(phone) {
            const regex = /^(78|77|79)\d{7}$/;
            return regex.test(phone);
        },
        message: 'Invalid phone number.'
    }
  },
  location: {
      type: [Number],
      required: true,
      default: 0
  },
  estimatedTime:{
        type: Number,
        required: true
  },
  note: String
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema);
