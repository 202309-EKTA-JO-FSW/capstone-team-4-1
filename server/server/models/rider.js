const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const riderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
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
        required: [true, 'License is required'],
        unique: true
    },
    nationalityId: {
        type: String,
        required: [true, 'Nationality ID required'],
        unique: true
    },
    location: {
        type: [Number],
        required: true,
        default: 0
    },
    vehicleNo: {
        type: String,
        required: [true, 'Vehicle Number required']
    },
}, { timestamps: true });

  
// Compare the given password with the hashed password in the database
riderSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Rider', riderSchema);
