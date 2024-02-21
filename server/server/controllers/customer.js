const mongoose = require("mongoose");
const RestaurantModel = require('../models/restaurant');
const Order = require('../models/order');
const Item = require('../models/item_dish');
const Dish = require('../models/item_dish');

const customerController = {};

customerController.proveOfLife = async (req, res) => {
    try {
      res.status(200).json({ message: 'Alive' });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  customerController.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


customerController.getRestaurantById = async (req, res) => {
    const { id } = req.params;

    try {
        const restaurant = await RestaurantModel.findById(id);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//This function could be replaced by the one below
/*customerController.getDishByIdFromRestaurant = async (req, res) => {
    const { restaurantId, dishId } = req.params;

    try {
        const restaurant = await RestaurantModel.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        const dish = restaurant.menu.find(dish => dish.equals(dishId));

        if (!dish) {
            return res.status(404).json({ message: 'Dish not found in this restaurant' });
        }

        res.status(200).json(dish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};*/

// Define a function to get all dishes from a restaurant

customerController.getAllDishesFromRestaurant = async function(req, res) {
    const restaurantId = req.params.restaurantId;

    try {
        const restaurant = await RestaurantModel.findById(restaurantId);
        
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        await restaurant.populate('menu').execPopulate();

        const dishes = restaurant.menu;

        return res.status(200).json({ dishes });
    } catch (error) {
        console.error('Error fetching dishes from the restaurant:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

customerController.addItemToCart = async (req, res) => {
    const { customerId, restaurantId, dishId, quantity, note } = req.body;

    try {
        // Check if the dish exists
        const item = await Item.findOne(({"dish._id": dishId}));
        if (!item) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        // Calculate total price based on quantity
        const totalPrice = item.dish.price * quantity;

        // Create or update the order
        let order = await Order.findOneAndUpdate(
            { customer: customerId, restaurant: restaurantId, status: 'Pending' },
            { $push: { items: { "dish._id": dishId, quantity, price: totalPrice, note } } },
            { new: true, upsert: true }
        );

        // Update total price of the order
        order.price += totalPrice;
        await order.save();

        res.status(201).json({ message: 'Item added to cart successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


customerController.placeOrder = async (req, res) => {
    const { customerId, restaurantId, riderId, items, total_price, estimatedTime, note } = req.body;

    try {
        // Create the order
        const order = new Order({
            customer: customerId,
            restaurant: restaurantId,
            rider: riderId,
            items,
            total_price,
            status: 'Pending',
            estimatedTime,
            note
        });

        // Save the order to the database
        await order.save();

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


customerController.removeItemFromCart = async (req, res) => {
    const { customerId, restaurantId, itemId } = req.body;

    try {
        // Find the order associated with the customer and restaurant
        let order = await Order.findOne({ customer: customerId, restaurant: restaurantId, status: 'Pending' });

        if (!order) {
            return res.status(404).json({ message: 'Order not found or already processed' });
        }

        // Find the index of the item to remove
        const itemIndex = order.items.findIndex(item => item._id.toString() === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Remove the item from the cart
        const removedItem = order.items.splice(itemIndex, 1)[0];

        // Update the total price of the order
        order.total_price -= removedItem.price * removedItem.quantity;

        // Save the updated order
        await order.save();

        res.status(200).json({ message: 'Item removed from cart successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*customerController.getPendingOrders = async (req, res) => {
    const { customerId, restaurantId } = req.params;

    try {
        // Find orders with status 'Pending' for the specified customer and restaurant
        const pendingOrders = await Order.find({ customer: customerId, restaurant: restaurantId, status: 'Pending' }).populate('customer restaurant rider items');

        res.status(200).json({ orders: pendingOrders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
*/
customerController.acceptOrder = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Find the order by its ID and update its status to 'Accepted'
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, status: 'Pending' },
            { status: 'Accepted' },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found or already accepted' });
        }

        res.status(200).json({ message: 'Order accepted successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

customerController.cancelOrder = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Find the order by its ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order status is 'Accepted' or 'Preparing'
        if (order.status !== 'Accepted' && order.status !== 'Preparing') {
            return res.status(400).json({ message: 'Order cannot be canceled because its status is not Accepted or Preparing' });
        }

        // Update the order status to 'Canceled'
        order.status = 'Canceled';
        await order.save();

        res.status(200).json({ message: 'Order canceled successfully', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

customerController.getAllOrders = async (req, res) => {
    try {
        // Query the Order model to fetch all orders
        const orders = await Order.find();

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

customerController.getPendingOrders = async (req, res) => {
    const { customerId, restaurantId } = req.params;

    try {
        const pendingOrders = await Order.aggregate([
            // Match orders with status 'Pending' for the specified customer and restaurant
            {
                $match: { customer: mongoose.Types.ObjectId(customerId), restaurant: mongoose.Types.ObjectId(restaurantId), status: 'Pending' }
            },
            // Join orders with items
            {
                $lookup: {
                    from: 'items',
                    localField: 'items',
                    foreignField: '_id',
                    as: 'items'
                }
            },
            // Project only required fields from items
            {
                $project: {
                    _id: 1,
                    total_price: 1,
                    items: {
                        title: '$items.dish.title',
                        quantity: '$items.quantity',
                        price: '$items.price'
                    }
                }
            }
        ]);

        res.status(200).json({ orders: pendingOrders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllDishes = async (req, res) => {
    try {
        // Retrieve all dishes from the database
        const dishes = await Dish.find();

        // Send the retrieved dishes as a response
        res.status(200).json({ dishes });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};
module.exports = customerController;