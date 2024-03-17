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
  // rider: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Rider',
  //   required: true
  // },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  }],
  totalProductPrice: {
    type: Number,
    default: 0,
    required: true
  },
  deliveryFee: {
    type: Number,
    default: 0,
    required: true
  },
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
    validate: {
        validator: function(phone) {
            const regex = /^(78|77|79)\d{7}$/;
            return regex.test(phone);
        },
        message: 'Invalid phone number.'
    }
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: {
      lat: Number,
      lng: Number
    },
    required: true,
    default: { lat: 0, lng: 0 }
  },
  estimatedTime:{
        type: Number,
        required: true
  },
  note: String
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema);
