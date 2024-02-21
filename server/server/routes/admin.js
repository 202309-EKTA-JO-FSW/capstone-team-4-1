const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get("/restaurants", adminController.getRestaurants);
router.get("/restaurants/:id", adminController.getRestaurants);
router.get("/riders", adminController.getRiders);
router.get("/riders/:id", adminController.getRiders);
router.get("/orders", adminController.getOrders);
router.get("/orders/:id", adminController.getOrders);
router.get("/customers", adminController.getCustomers);
router.get("/customers/:id", adminController.getCustomers);

router.post("/restaurants", adminController.addRestaurant);
router.post("/riders", adminController.addRider);

router.put("/restaurants/:id", adminController.updateRestaurant);
router.put("/riders/:id", adminController.updateRider);
router.put("/orders/:id", adminController.updateOrder);
router.put("/customers/:id", adminController.updateCustomer);

router.delete("/restaurants/:id", adminController.removeRestaurant);
router.delete("/riders/:id", adminController.removeRider);
router.delete("/orders/:id", adminController.removeOrder);

module.exports = router;