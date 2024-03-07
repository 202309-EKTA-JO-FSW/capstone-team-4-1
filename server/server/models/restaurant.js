const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
                return regex.test(phone);
            },
            message: 'Invalid phone number.'
        }
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        unique: true
    },
    role: {
        type: String,
        enum: ['customer', 'rider', 'restaurant', 'admin'],
        default: 'restaurant',
        required: true
    },
    license: {
        type: String,
        required: true,
        unique: true
    },
    street: {
        type: String,
        required: true
    },
    buildingNo: {
        type: Number,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    cuisine: {
        type: [String],
        required: true
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    deliveryTime: {
        type: Number,
        required: true,
    },
    deliveryFee: {
        type: Number,
        required: true
    },
}, { timestamps: true }); 
  
// Compare the given password with the hashed password in the database
restaurantSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Restaurant', restaurantSchema);
