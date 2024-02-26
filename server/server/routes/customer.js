const express  = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");
const { authenticate } = require('../middleware/auth');
const { checkCustomerRole } = require('../middleware/verify');

router.get("/", authenticate, checkCustomerRole, customerController.proveOfLife);
router.get('/restaurants', authenticate, checkCustomerRole, customerController.getAllRestaurants);
router.get('/restaurant/:id', authenticate, checkCustomerRole, customerController.getRestaurantById);
router.get('/dishes', authenticate, checkCustomerRole, customerController.getAllDishes);
router.get('/dishes/:dishId', authenticate, checkCustomerRole, customerController.getDishById);
router.get('/dishes/:restaurantId', authenticate, checkCustomerRole, customerController.getAllDishesOfRestaurant);
router.get('/orders/:userId', authenticate, checkCustomerRole, customerController.getAllOrdersByUserId);
router.get('/orders/pending/:customerId/:restaurantId', authenticate, checkCustomerRole, customerController.getPendingOrders);
router.post('/cart/customerId', authenticate, checkCustomerRole, customerController.addItemToCart);
router.put('/orders/:orderId/accept', authenticate, checkCustomerRole, customerController.acceptOrder);
router.put('/orders/:orderId/cancel', authenticate, checkCustomerRole, customerController.cancelOrder);
router.delete('/cart', authenticate, checkCustomerRole, customerController.removeItemFromCart);

module.exports = router;