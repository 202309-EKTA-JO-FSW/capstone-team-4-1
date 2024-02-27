const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.registerAdmin);
router.post('/customer/register', authController.registerCustomer);
router.post('/restaurant/register', authController.registerRestaurant);
router.post('/rider/register', authController.registerRider);
router.post('/login', authController.login);

module.exports = router;