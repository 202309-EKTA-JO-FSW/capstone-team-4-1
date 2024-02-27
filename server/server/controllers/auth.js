const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
const Customer = require('../models/customer');
const Restaurant = require('../models/restaurant');
const Rider = require('../models/rider');

// Login with an existing user
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const users = [ Admin, Customer, Restaurant, Rider ];

    let user;
    let token;

    for (let userModel of users) {
      user = await userModel.findOne({ email });
      if (user) {
        const passwordMatch = await user.comparePassword(password);

        if (!user || !passwordMatch) {
          return res.status(401).json({ message: 'Incorrect email or password' });
        }

        token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
          expiresIn: '1 hour'
        });
      }
    }

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

// Register a new admin
const registerAdmin = async (req, res, next) => {
  const { firstName, lastName, email, password, phone, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Admin({ firstName, lastName, email, password: hashedPassword, phone, role });
    await user.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

// Register a new customer
const registerCustomer = async (req, res, next) => {
  const { firstName, lastName, email, password, phone, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Customer({ firstName, lastName, email, password: hashedPassword, phone, role });
    await user.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

// Register a new restaurant
const registerRestaurant = async (req, res, next) => {
    const { title, email, password, phone, role, license, street, buildingNo, area, cuisine, menu, deliveryTime, deliveryFee } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new Restaurant({ title, email, password: hashedPassword, phone, role, license, street, buildingNo, area, cuisine, menu, deliveryTime, deliveryFee });
      await user.save();
      res.json({ message: 'Registration successful' });
    } catch (error) {
      next(error);
    }
  };

// Register a new rider
const registerRider = async (req, res, next) => {
  const { firstName, lastName, email, password, phone, role, license, nationalityId, vehicleNo } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Rider({ firstName, lastName, email, password: hashedPassword, phone, role, license, nationalityId, vehicleNo });
    await user.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, registerAdmin, registerCustomer, registerRestaurant, registerRider };