const mongoose = require('mongoose');
const validator = require('validator');

const riderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
                return regex.test(phone);
            },
            message: 'Invalid phone number.'
        }
    },
    role: {
        type: String,
        enum: ['Customer', 'Rider', 'Restaurant', 'Admin'],
        default: 'Rider',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Delivering', 'Offline'],
        default: 'Offline'
    },
    license: {
        type: String,
        required: true,
        unique: true
    },
    nationalityId: {
        type: String,
        required: true,
        unique: true
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
    }],
    registered_at: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('Rider', riderSchema);
