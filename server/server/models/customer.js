const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true,
    },
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
  }]
},{ timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);