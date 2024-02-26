const express = require('express');
const router = express.Router();
const riderController = require('../controllers/rider');

router.get('/:riderId/orders', riderController.getOrders);
router.get('/:riderId/orders/:orderId', riderController.getOrder);
router.put('/:riderId/status', riderController.updateStatus);

module.exports = router;
