const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { verifyRider } = require('../middleware/verify');

const riderController = require('../controllers/rider');

router.get('/:riderId/orders', authenticate, verifyRider, riderController.getOrders);
router.get('/:riderId/orders/:orderId', authenticate, verifyRider, riderController.getOrder);
router.put('/:riderId/status', authenticate, verifyRider, riderController.updateStatus);

module.exports = router;
