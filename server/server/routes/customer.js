const express  = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { verifyCustomer } = require('../middleware/verify');
const { verifyUser } = require('../middleware/verify');

const customerController = require('../controllers/customer');

// router.get('/restaurants', customerController.getAllRestaurants);
// router.get('/restaurant/:id', customerController.getRestaurantById);
// router.get('/dishes', customerController.getAllDishes);
// router.get('/dishes/:dishId', customerController.getDishById);
// router.get('/dishes/restaurant/:restaurantId', customerController.getAllDishesOfRestaurant);
router.get('/profile/:customerId', authenticate, verifyUser(['customer','admin']), customerController.getProfile);
router.get('/restaurants', authenticate, verifyUser(['customer','admin']), customerController.getAllRestaurants);
router.get('/restaurant/:id', authenticate, verifyUser(['customer','admin']), customerController.getRestaurantById);
router.get('/dishes', authenticate, verifyUser(['customer','admin']), customerController.getAllDishes);
router.get('/dishes/:dishId', authenticate, verifyUser(['customer','admin']), customerController.getDishById);
router.get('/dishes/restaurant/:restaurantId', authenticate, verifyUser(['customer','admin']), customerController.getAllDishesOfRestaurant);
router.get('/orders/:customerId', authenticate, verifyCustomer, customerController.getAllOrdersByCustomerId);
router.get('/orders/pending/:customerId/:restaurantId', authenticate, verifyCustomer, customerController.getPendingOrders);
router.post('/cart', authenticate, verifyCustomer, customerController.addItem);
router.delete('/cart', authenticate, verifyCustomer, customerController.removeItemFromCart);

module.exports = router;