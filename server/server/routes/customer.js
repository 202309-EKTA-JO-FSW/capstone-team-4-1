const express  = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");

router.get('/restaurants', customerController.getAllRestaurants);
router.get('/restaurant/:id', customerController.getRestaurantById);
router.get('/dishes', customerController.getAllDishes);
router.get('/dishes/:dishId', customerController.getDishById);
router.get('/dishes/:restaurantId', customerController.getAllDishesOfRestaurant);
router.get('/orders/:userId', customerController.getAllOrdersByUserId);
router.get('/orders/pending/:customerId/:restaurantId', customerController.getPendingOrders);
router.post('/cart', customerController.addItem);
router.delete('/cart', customerController.removeItemFromCart);

module.exports = router;