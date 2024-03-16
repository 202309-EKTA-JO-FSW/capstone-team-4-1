const RestaurantModel = require('../models/restaurant');
const Order = require('../models/order');
const Item = require('../models/item');
const Dish = require('../models/dish');
const Customer = require('../models/customer');
const bcrypt = require('bcrypt');
const Rider = require('../models/rider')

// get customer profile

const getProfile = async (req, res) => {
  const { customerId } = req.params;
  try {
    const profile = await Customer.findById(customerId);

    if (!profile) {
      res.status(422).json({ message: "No profile found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

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
    res.status(402).json({ message: error.message });
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
    res.status(402).json({ message: error.message })
  }
}

// Get All Dishes:

const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find()
    res.status(200).json({ dishes })
  } catch (error) {
    res.status(402).json({ message: error.message })
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
    res.status(402).json({ message: error.message })
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
    res.status(402).json({ error: 'Internal server error' })
  }
}

// Get All Orders By CustomerId

const getAllOrdersByCustomerId = async (req, res) => {
  const customerId = req.params.customerId
  try {
    const orders = await Order.find({ customer: customerId })
    res.status(200).json({ orders })
  } catch (error) {
    res.status(402).json({ message: error.message })
  }
}

// Add An Item To Cart

const getCart = async (req, res) => {
  const { customerId } = req.body
  try {
    const cartItems = await Item.find({ customer: customerId, state: 'cart'});
    if (!cartItems) {
      return res.status(404).json({ message: 'Cart empty' })
    }
    
    res.status(201).json(cartItems)
  } catch (error) {
    res.status(402).json({ message: error.message })
  }
}

// Add An Item To Cart

const addItem = async (req, res) => {
  const { restaurant, customer, dish, dishName, quantity, price, totalPrice, note } = req.body
  console.log("this the body",req.body)
  try {
    const findDish = await Dish.findById(dish)

    if (!findDish) {
      return res.status(404).json({ message: 'Dish not found' })
    }
    // const totalPrice = findDish.price * quantity
    const cartItem = await Item.create({ 
      restaurant: restaurant,
      customer: customer,
      dish: dish,
      dishName: dishName,
      quantity: quantity,
      price: price,
      totalPrice: totalPrice,
      note: note,
      state: 'cart'
    })
    await cartItem.save()
    res.status(201).json({ message: 'Item added to cart successfully', cartItem })
  } catch (error) {
    res.status(402).json({ message: error.message })
  }
}

// Edit Customer Profile

const editProfile = async (req, res) => {
  const { customerId } = req.params;
  const { firstName, lastName, email, password, newpassword, confirmpassword, phone, street, buildingNo } = req.body
  try {
    const infoUpdate = {};

    const customer = await Customer.findById(customerId);
    
    if (customer) {

      // change password

      if (password !== '' && newpassword !== '' && confirmpassword !== '') {
        const passwordMatch = await customer.comparePassword(password);

        if (!passwordMatch || newpassword !== confirmpassword) {
          return res.status(401).json({ message: 'Incorrect input' });
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10);
        infoUpdate.password = hashedPassword;
      }
        
      // change the rest of the customer information 

      if (firstName !== '') {
        infoUpdate.firstName = firstName;
      }
      if (lastName !== '') {
        infoUpdate.lastName = lastName;
      }
      if (email !== '') {
        infoUpdate.email = email;
      }
      if (phone !== '') {
        infoUpdate.phone = phone;
      }
      if (street !== '') {
        infoUpdate.street = street;
      }
      if (buildingNo !== '') {
        infoUpdate.buildingNo = buildingNo;
      }

    }

    const customerUpdate = await Customer.findByIdAndUpdate(customerId, infoUpdate, { new: true } )
    if (!customerUpdate) {
      return res.status(404).json({ message: 'Failed to update cusotmer information' })
    }
    
    res.status(201).json(customerUpdate)
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
    res.status(402).json({ message: error.message })
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
    res.status(402).json({ message: error.message })
  }
}


const createOrder = async (req, res) => {
  const { customerId, restaurantId, items, note, riderId } = req.body;

  try {
    
    const customerExists = await Customer.findById(customerId);
    if (!customerExists) {
      return res.status(404).json({ message: "Customer not found" });
    }

    
    const restaurantExists = await RestaurantModel.findById(restaurantId);
    if (!restaurantExists) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const riderExists = await Rider.findById(riderId);
    if (!riderExists) {
      return res.status(404).json({ message: "Rider not found" });
    }
    
    for (let itemId of items) {
      const itemExists = await Item.findById(itemId);
      if (!itemExists) {
        return res.status(404).json({ message: `Item with ID ${itemId} not found` });
      }
    }

    const total_price = items.reduce(async (acc, itemId) => {
      const item = await Item.findById(itemId);
      return acc + (item.price * item.quantity);
    }, 0);

    const newOrder = new Order({
      customer: customerId,
      restaurant: restaurantId,
      items: items,
      total_price: await total_price,
      note: note,
      rider: riderId,
      status: 'Pending',
    });

    await newOrder.save();

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};



module.exports = { 
  getProfile,
  getAllRestaurants,
  getRestaurantById,
  getAllDishes,
  getDishById,
  getAllDishesOfRestaurant,
  getAllOrdersByCustomerId,
  getPendingOrders,
  getCart,
  addItem,
  editProfile,
  removeItemFromCart,
  createOrder
};

