const mongoose = require('mongoose');

const RiderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    license: {
        type: String,
        required: true,
        unique: true
    },
    nationalityId: {
        type: String,
        required: true
    },
    location: {
        type: [Number],
        required: true
    },
    vehicleNo: {
        type: String,
        required: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' 
    }]
}, { timestamps: true });

module.exports = mongoose.model('Rider', RiderSchema);
