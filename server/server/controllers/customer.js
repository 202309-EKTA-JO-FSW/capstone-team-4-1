const RestaurantModel = require('../models/restaurant')
const Order = require('../models/order')
const Item = require('../models/item')
const Dish = require('../models/dish')

const customerController = {}

customerController.proveOfLife = async (req, res) => {
  try {
    res.status(200).json({ message: 'Alive' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Get All Restaurants:

customerController.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find()
    res.status(200).json(restaurants)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get Restaurant By ID:

customerController.getRestaurantById = async (req, res) => {
  const { id } = req.params
  try {
    const restaurant = await RestaurantModel.findById(id)

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' })
    }
    res.status(200).json(restaurant)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get All Dishes:

customerController.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find()
    res.status(200).json({ dishes })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get A certain Dish By Id

customerController.getDishById = async (req, res) => {
  const { dishId } = req.params
  try {
    const dish = await Dish.findById(dishId)
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' })
    }
    const restaurant = await RestaurantModel.findById(dish.restaurant)
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found for the dish' })
    }
    const restaurantName = restaurant.name
    res.status(200).json({ dish, restaurantName })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get All dishes Of A Certain Restaurant

customerController.getAllDishesOfRestaurant = async (req, res) => {
  const { restaurantId } = req.params
  try {
    // Find all dishes for the specified restaurant
    const dishes = await Dish.find({ restaurant: restaurantId })
    res.status(200).json({ dishes })
  } catch (error) {
    console.error('Error fetching dishes:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get All Orders By UserId

customerController.getAllOrdersByUserId = async (req, res) => {
  const userId = req.params.userId
  try {
    const orders = await Order.find({ customer: userId })
    res.status(200).json({ orders })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Add An Item To Cart

customerController.addItemToCart = async (req, res) => {
  const { customerId } = req.params
  const { restaurantId, dishId, quantity, note } = req.body
  try {
    const item = await Item.findOne(({ 'dish._id': dishId }))
    if (!item) {
      return res.status(404).json({ message: 'Dish not found' })
    }
    const totalPrice = item.dish.price * quantity
    const order = await Order.findOneAndUpdate(
      { customer: customerId, restaurant: restaurantId, status: 'Pending' },
      { $push: { items: { 'dish._id': dishId, quantity, price: totalPrice, note } } },
      { new: true, upsert: true }
    )
    order.price += totalPrice
    await order.save()
    res.status(201).json({ message: 'Item added to cart successfully', order })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Accept Order

customerController.acceptOrder = async (req, res) => {
  const orderId = req.params.orderId
  try {
    // Find the order by its ID and update its status to 'Accepted'
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId, status: 'Pending' },
      { status: 'Accepted' },
      { new: true }
    )
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found or already accepted' })
    }
    res.status(200).json({ message: 'Order accepted successfully', order: updatedOrder })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Cancel Order

customerController.cancelOrder = async (req, res) => {
  const orderId = req.params.orderId
  try {
    // Find the order by its ID
    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    if (order.status !== 'Accepted' && order.status !== 'Preparing') {
      return res.status(400).json({ message: 'Order cannot be canceled because its status is not Accepted or Preparing' })
    }
    order.status = 'Canceled'
    await order.save()
    res.status(200).json({ message: 'Order canceled successfully', order })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Remove Item From Cart

customerController.removeItemFromCart = async (req, res) => {
  const { customerId, restaurantId, itemId } = req.body

  try {
    const order = await Order.findOne({ customer: customerId, restaurant: restaurantId, status: 'Pending' })

    if (!order) {
      return res.status(404).json({ message: 'Order not found or already processed' })
    }
    const itemIndex = order.items.findIndex(item => item._id.toString() === itemId)
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' })
    }
    const removedItem = order.items.splice(itemIndex, 1)[0]
    order.total_price -= removedItem.price * removedItem.quantity
    await order.save()
    res.status(200).json({ message: 'Item removed from cart successfully', order })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get Pending Orders (Cart)

customerController.getPendingOrders = async (req, res) => {
  const { customerId, restaurantId } = req.params
  try {
    const pendingOrders = await Order.find({ customer: customerId, restaurant: restaurantId, status: 'Pending' })
      .populate('items')
    res.status(200).json({ orders: pendingOrders })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = customerController
