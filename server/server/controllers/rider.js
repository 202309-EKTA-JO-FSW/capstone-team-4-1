const Order = require("../models/order")
const Rider = require("./models/rider")

const riderController = {
    getOrders: async (req, res) => {
        const { status } = req.query
        const { riderId } = req.params
        const validStatuses = ['Pending', 'Accepted', 'Preparing', 'On The Way', 'Delivered', 'Canceled']

        try {
            let query = { rider: riderId };

            if (status) {
                const isStatusValid = validStatuses.includes(status);
                if (!isStatusValid) {
                    return res.status(400).json({ message: "Invalid Status" });
                }
                query.status = status;
            }

            const orders = await Order.find(query).populate('customer restaurant items');
            res.status(200).json(orders);

        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    getOrder: async (req, res) => {
        const { orderId, riderId } = req.params

        try {
            const order = await Order.findOne({ _id: orderId, rider: riderId }).populate('customer restaurant items');

            if (!order) {
                return res.status(404).json({ message: "Order not found or does not belong to rider" })
            }

            res.status(200).json(order);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}