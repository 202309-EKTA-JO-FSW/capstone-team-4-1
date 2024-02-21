const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant');

router.get("/menu/:restaurantId", restaurantController.getAllDishes);
router.get("/dish/:dishId", restaurantController.getDish);
router.get("/orders/:restaurantId", restaurantController.getOrders);
router.get("/order/:orderId", restaurantController.getOrder);
router.post("/dish/:restaurantId", restaurantController.addDish);
router.put("/dish/:dishId", restaurantController.updateDish);
router.delete("/dish/:dishId", restaurantController.removeDish);


module.exports = router;