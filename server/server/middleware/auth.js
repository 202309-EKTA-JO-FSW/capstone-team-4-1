const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Customer = require('../models/customer');
const Restaurant = require('../models/restaurant');
const Rider = require('../models/rider');


const authenticate = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const users = [ Admin, Customer, Restaurant, Rider ];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    let user;

    for (let userModel of users) {
      user = await userModel.findById(decodedToken.userId);
      if (user) {
        req.user = user;
        break;
      }
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticate };
