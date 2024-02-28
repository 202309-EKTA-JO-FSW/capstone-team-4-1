const express  = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { verifyCustomer } = require('../middleware/verify');

const customerController = require('../controllers/customer');

router.get('/restaurants', authenticate, verifyCustomer, customerController.getAllRestaurants);
router.get('/restaurant/:id', authenticate, verifyCustomer, customerController.getRestaurantById);
router.get('/dishes', authenticate, verifyCustomer, customerController.getAllDishes);
router.get('/dishes/:dishId', authenticate, verifyCustomer, customerController.getDishById);
router.get('/dishes/:restaurantId', authenticate, verifyCustomer, customerController.getAllDishesOfRestaurant);
router.get('/orders/:userId', authenticate, verifyCustomer, customerController.getAllOrdersByUserId);
router.get('/orders/pending/:customerId/:restaurantId', authenticate, verifyCustomer, customerController.getPendingOrders);
router.post('/cart', authenticate, verifyCustomer, customerController.addItem);
router.delete('/cart', authenticate, verifyCustomer, customerController.removeItemFromCart);

module.exports = router;