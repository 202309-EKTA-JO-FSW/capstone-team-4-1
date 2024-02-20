const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    license: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String,
        required: true
    },
    cuisine: {
        type: [String],
        required: true
    },
    menu: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dishes',
        required: true
    }],
    rate: {
        type: Number,
        min: 0,
        max: 5,
    },
    deliveryTime: {
        type: Date,
        required: true,
    },
    deliveryFee: {
        type: Number,
        required: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }]
}, { timestamps: true }); 

module.exports = mongoose.model('Restaurant', restaurantSchema);