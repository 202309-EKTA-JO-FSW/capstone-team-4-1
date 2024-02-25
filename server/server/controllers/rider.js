const Order = require("../models/order");
const Rider = require("../models/rider");

const validStatuses = ['Pending', 'Accepted', 'Preparing', 'On The Way', 'Delivered', 'Canceled'];

const riderController = {
    getOrders: async (req, res) => {
        const { status } = req.query;
        const { riderId } = req.params;

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        try {
            let query = { rider: riderId };
            if (status) {
                query.status = status;
            }

            const orders = await Order.find(query).populate('Customer Restaurant Items').exec();
            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: "No orders found" });
            }
            res.status(200).json(orders);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    },
    getOrder: async (req, res) => {
        const { orderId, riderId } = req.params;
        try {
            const order = await Order.findOne({ _id: orderId, rider: riderId }).populate('Customer Restaurant Items').exec(); 
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order); 
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }
};

module.exports = riderController;
