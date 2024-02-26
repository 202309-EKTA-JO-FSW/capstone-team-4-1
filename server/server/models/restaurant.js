const mongoose = require('mongoose');
const validator = require('validator');

const restaurantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
          validator: function(password) {
            const minLength = 8;
            const hasUppercase = /[A-Z]/;
            const hasLowercase = /[a-z]/;
            const hasNumber = /[0-9]/;
            const hasSpecialChar = /[\W_]/; // Matches any non-word character or underscore
    
            return validator.isLength(password, { min: minLength })
              && hasUppercase.test(password)
              && hasLowercase.test(password)
              && hasNumber.test(password)
              && hasSpecialChar.test(password);
          },
          message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        validate: {
            validator: function(phone) {
                const regex = /^(78|77|79)\d{7}$/;
                return regex.test(phoneNumber);
            },
            message: 'Invalid phone number.'
        }
    },
    role: {
        type: String,
        enum: ['Customer', 'Rider', 'Restaurant', 'Admin'],
        default: 'Customer',
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
        type: Number,
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
    }],
    registered_at: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true }); 

module.exports = mongoose.model('Restaurant', restaurantSchema);