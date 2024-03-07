const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { verifyRestauarant } = require('../middleware/verify');

const restaurantController = require('../controllers/restaurant');

router.get("/profile/:restaurantId", authenticate, verifyRestauarant, restaurantController.getProfile);
router.get("/menu/:restaurantId", authenticate, verifyRestauarant, restaurantController.getAllDishes);
router.get("/dish/:dishId", authenticate, verifyRestauarant, restaurantController.getDish);
router.get("/orders/:restaurantId", authenticate, verifyRestauarant, restaurantController.getOrders);
router.get("/order/:orderId", authenticate, verifyRestauarant, restaurantController.getOrder);
router.post("/dish/:restaurantId", authenticate, verifyRestauarant, restaurantController.addDish);
router.put("/dish/:dishId", authenticate, verifyRestauarant, restaurantController.updateDish);
router.delete("/dish/:dishId", authenticate, verifyRestauarant, restaurantController.removeDish);


module.exports = router;