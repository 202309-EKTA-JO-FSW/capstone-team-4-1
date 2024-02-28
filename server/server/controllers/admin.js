const Restaurant = require('../models/restaurant');
const Rider = require('../models/rider');
const Order = require('../models/order');
const Customer = require('../models/customer');
const Admin = require('../models/admin');

const adminController = {
    getAdmins: async (req, res) => {
        try {
            const admins = await Admin.find({});
            return res.json(admins);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
    },

    getRestaurants: async (req, res) => {
        try {
          if (req.params.id) {
            const restaurant = await Restaurant.findById(req.params.id);
            if (!restaurant) {
              return res.status(404).json({ message: 'Restaurant not found' });
            }
            return res.json(restaurant);
          } else {
            const restaurants = await Restaurant.find();
            res.json(restaurants);
          }
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      },
    
      getRiders: async (req, res) => {
        try {
          if (req.params.id) {
            const rider = await Rider.findById(req.params.id);
            if (!rider) {
              return res.status(404).json({ message: 'Rider not found' });
            }
            return res.json(rider);
          } else {
            const riders = await Rider.find();
            res.json(riders);
          }
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      },
    
      getOrders: async (req, res) => {
        try {
          if (req.params.id) {
            const order = await Order.findById(req.params.id);
            if (!order) {
              return res.status(404).json({ message: 'Order not found' });
            }
            return res.json(order);
          } else {
            const orders = await Order.find();
            res.json(orders);
          }
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      },
    
      getCustomers: async (req, res) => {
        try {
          if (req.params.id) {
            const customer = await Customer.findById(req.params.id);
            if (!customer) {
              return res.status(404).json({ message: 'Customer not found' });
            }
            return res.json(customer);
          } else {
            const customers = await Customer.find();
            res.json(customers);
          }
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      },
    addRestaurant: async (req, res) => {
      const restaurantData = req.body;
      try {
        const newRestaurant = await Restaurant.create(restaurantData);
        res.status(201).json(newRestaurant);
      } catch (err) {
        res.status(422).json({ message: err.message });
      }
    },

    addRider: async (req, res) => {
      const riderData = req.body;
      try {
        const newRider = await Rider.create(riderData);
        res.status(201).json(newRider);
      } catch (err) {
        res.status(422).json({ message: err.message });
      }
    },

    updateRestaurant: async (req, res) => {
      const { id } = req.params;
      try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true }
        );
        if (!updatedRestaurant) {
          res.status(422).json({ message: "The restaurant you are trying to update wasn't found" });
        } else {
          res.status(200).json(updatedRestaurant);
        }
      } catch (err) {
        res.status(422).json({ message: err.message });
      }
    },

    updateRider: async (req, res) => {
      const { id } = req.params;
      try {
        const updatedRider = await Rider.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true }
        );
        if (!updatedRider) {
          res.status(422).json({ message: "The rider you are trying to update wasn't found" });
        } else {
          res.status(200).json(updatedRider);
        }
      } catch (err) {
        res.status(422).json({ message: err.message });
      }
    },

    updateOrder: async (req, res) => {
      const { id } = req.params;
      try {
        const updatedOrder = await Order.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true }
        );
        if (!updatedOrder) {
          res.status(422).json({ message: "The order you are trying to update wasn't found" });
        } else {
          res.status(200).json(updatedOrder);
        }
      } catch (err) {
        res.status(422).json({ message: err.message });
      }
    },

    updateCustomer: async (req, res) => {
      const { id } = req.params;
      try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true }
        );
        if (!updatedCustomer) {
          res.status(422).json({ message: "The customer you are trying to update wasn't found" });
        } else {
          res.status(200).json(updatedCustomer);
        }
      } catch (err) {
        res.status(422).json({ message: err.message });
      }
    },

    removeAdmin: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) {
          res.status(422).json({ message: "The admin you are trying to delete wasn't found" });
        } else {
          res.status(201).json({ message: "The admin was deleted successfully" });
        }
      } catch (err) {
        res.status(422).json({ message: err.message });
      }
    },

    removeRestaurant: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
        if (!deletedRestaurant) {
          res.status(422).json({ message: "The restaurant you are trying to delete wasn't found" });
        } else {
          res.status(201).json({ message: "The restaurant was deleted successfully" });
        }
      } catch (err) {
        res.status(422).json({ message: err.message });
      }
    },

    removeCustomer: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
          res.status(422).json({ message: "The Customer you are trying to delete wasn't found" });
        } else {
          res.status(201).json({ message: "The Customer was deleted" });
        }
      } catch (err) {
        res.status(422).json({ message: err.message });
      }
    },

    removeRider: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedRider = await Rider.findByIdAndDelete(id);
        if (!deletedRider) {
          res.status(422).json({ message: "The rider you are trying to delete wasn't found" });
        } else {
          res.status(201).json({ message: "The rider was deleted" });
        }
      } catch (err) {
        res.status(422).json({ message: err.message });
      }
    },

    removeOrder: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
          res.status(422).json({ message: "The order you are trying to delete wasn't found" });
        } else {
          res.status(201).json({ message: "The order was deleted" });
        }
      } catch (err) {
        res.status(422).json({ message: err.message });
      }
    }
};

module.exports = adminController;