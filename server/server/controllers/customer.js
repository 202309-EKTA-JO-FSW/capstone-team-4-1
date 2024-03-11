const RestaurantModel = require('../models/restaurant');
const Order = require('../models/order');
const Item = require('../models/item');
const Dish = require('../models/dish');

// Get All Restaurants:

const getAllRestaurants = async (req, res) => {
  const { title, cuisine, area, rate, deliveryTime } = req.query;
  const query = {};
  if (title) query.title = { $regex: new RegExp(title, 'i') };//$regex: Provides regular expression capabilities for pattern matching strings in queries. i: Case-insensitive
  if (area) query.area = { $regex: new RegExp(area, 'i') };
  if (cuisine) query.cuisine = { $regex: new RegExp(cuisine, 'i') };
  if (rate) query.rate = rate;
  if (deliveryTime) query.deliveryTime = { $lte: deliveryTime };

  try {
    const restaurants = await RestaurantModel.find(query);
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get Restaurant By ID:

const getRestaurantById = async (req, res) => {
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

const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find()
    res.status(200).json({ dishes })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get A certain Dish By Id

const getDishById = async (req, res) => {
  const { dishId } = req.params
  try {
    const dish = await Dish.findById(dishId)
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' })
    }
    
    res.status(200).json(dish)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get All dishes Of A Certain Restaurant

const getAllDishesOfRestaurant = async (req, res) => {
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

// Get All Orders By CustomerId

const getAllOrdersByCustomerId = async (req, res) => {
  const customerId = req.params.customerId
  try {
    const orders = await Order.find({ customer: customerId })
    res.status(200).json({ orders })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Add An Item To Cart

const addItem = async (req, res) => {
  const { dishId, quantity, note } = req.body
  try {
    const item = await Item.findOne(({ 'dish._id': dishId }))
    if (!item) {
      return res.status(404).json({ message: 'Dish not found' })
    }
    const totalPrice = item.dish.price * quantity
    const cartItem = await Item.create({ 'dish._id': dishId, quantity, price: totalPrice, note },
    { new: true, upsert: true })
    await cartItem.save()
    res.status(201).json({ message: 'Item added to cart successfully', cartItem })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Remove Item From Cart

const removeItemFromCart = async (req, res) => {
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

const getPendingOrders = async (req, res) => {
  const { customerId, restaurantId } = req.params
  try {
    const pendingOrders = await Order.find({ customer: customerId, restaurant: restaurantId, status: 'Pending' })
      .populate('items')
    res.status(200).json({ orders: pendingOrders })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getAllRestaurants, getRestaurantById, getAllDishes, getDishById, getAllDishesOfRestaurant, getAllOrdersByCustomerId, getPendingOrders, addItem, removeItemFromCart };