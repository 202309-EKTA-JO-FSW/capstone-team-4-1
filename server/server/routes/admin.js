const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { verifyAdmin } = require('../middleware/verify');

const adminController = require('../controllers/admin');

router.get("/admins", authenticate, verifyAdmin, adminController.getAdmins);
router.get("/restaurants", authenticate, verifyAdmin, adminController.getRestaurants);
router.get("/restaurants/:id", authenticate, verifyAdmin, adminController.getRestaurants);
router.get("/riders", authenticate, verifyAdmin, adminController.getRiders);
router.get("/riders/:id", authenticate, verifyAdmin, adminController.getRiders);
router.get("/orders", authenticate, verifyAdmin, adminController.getOrders);
router.get("/orders/:id", authenticate, verifyAdmin, adminController.getOrders);
router.get("/customers", authenticate, verifyAdmin, adminController.getCustomers);
router.get("/customers/:id", authenticate, verifyAdmin, adminController.getCustomers);

router.post("/restaurants", authenticate, verifyAdmin, adminController.addRestaurant);
router.post("/riders", authenticate, verifyAdmin, adminController.addRider);

router.put("/restaurants/:id", authenticate, verifyAdmin, adminController.updateRestaurant);
router.put("/riders/:id", authenticate, verifyAdmin, adminController.updateRider);
router.put("/orders/:id", authenticate, verifyAdmin, adminController.updateOrder);
router.put("/customers/:id", authenticate, verifyAdmin, adminController.updateCustomer);

router.delete("/admins/:id", authenticate, verifyAdmin, adminController.removeAdmin);
router.delete("/restaurants/:id", authenticate, verifyAdmin, adminController.removeRestaurant);
router.delete("/customers/:id", authenticate, verifyAdmin, adminController.removeCustomer);
router.delete("/riders/:id", authenticate, verifyAdmin, adminController.removeRider);
router.delete("/orders/:id", authenticate, verifyAdmin, adminController.removeOrder);

module.exports = router;