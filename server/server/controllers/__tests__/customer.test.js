/* eslint-disable no-undef */
const customerController = require('../customer')
const Restaurant = require('../../models/restaurant')
const Order = require('../../models/order')
const Dish = require('../../models/dish')
const Item = require('../../models/item')

jest.mock('../../models/dish')
jest.mock('../../models/item')
jest.mock('../../models/restaurant')
jest.mock('../../models/rider')
jest.mock('../../models/order')
jest.mock('../../models/customer')

describe('CustomerController', () => {
  let req, res

  beforeEach(() => {
    req = { params: {}, body: {} }
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    }
  })

  describe('getAllRestaurants', () => {
    it('should return all restaurants', async () => {
      Restaurant.find.mockResolvedValue(['restaurant1', 'restaurant2'])
      await customerController.getAllRestaurants(req, res)
      expect(res.json).toHaveBeenCalledWith(['restaurant1', 'restaurant2'])
    })
  })

  describe('getRestaurantById', () => {
    it('should return a restaurant by id', async () => {
      req.params.id = 'testId'
      Restaurant.findById.mockResolvedValue('restaurant1')
      await customerController.getRestaurantById(req, res)
      expect(res.json).toHaveBeenCalledWith('restaurant1')
    })
  })

  describe('getAllDishes', () => {
    it('should return all Dishes', async () => {
      Dish.find.mockResolvedValue(['Dish1', 'Dish2'])
      await customerController.getAllDishes(req, res)
      expect(res.json).toHaveBeenCalledWith({ dishes: ['Dish1', 'Dish2'] })
    })
  })

  describe('getDishById', () => {
    it('should return a dish by id', async () => {
      req.params.dishId = 'testId'
      Dish.findById.mockResolvedValue({
        _id: 'testId',
        restaurant: 'testRestaurantId'
      })
      Restaurant.findById.mockResolvedValue({
        name: 'Test Restaurant'
      })
      await customerController.getDishById(req, res)
      expect(res.json).toHaveBeenCalledWith({
        dish: {
          _id: 'testId',
          restaurant: 'testRestaurantId'
        },
        restaurantName: 'Test Restaurant'
      })
    })
  })

  describe('getAllDishesOfRestaurant', () => {
    beforeEach(() => {
      req.params.restaurantId = 'testRestaurantId'
    })
    it('should return all dishes from the restaurant', async () => {
      const mockDishes = [
        {
          _id: 'dishId1',
          restaurant: 'testRestaurantId',
          title: 'Dish 1',
          description: 'Description 1',
          image: 'Image 1',
          price: 10,
          category: 'Category 1'
        },
        {
          _id: 'dishId2',
          restaurant: 'testRestaurantId',
          title: 'Dish 2',
          description: 'Description 2',
          image: 'Image 2',
          price: 15,
          category: 'Category 2'
        }
      ]
      Dish.find.mockResolvedValue(mockDishes)
      await customerController.getAllDishesOfRestaurant(req, res)
      expect(Dish.find).toHaveBeenCalledWith({ restaurant: 'testRestaurantId' })
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ dishes: mockDishes })
    })
  })

  describe('getAllOrdersByUserId', () => {
    it('should return all orders for a user', async () => {
      req.params.userId = 'testUserId'
      Order.find.mockResolvedValue(['order1', 'order2'])
      Order.find = jest.fn().mockResolvedValue(['order1', 'order2'])
      await customerController.getAllOrdersByUserId(req, res)
      expect(res.json).toHaveBeenCalledWith({ orders: ['order1', 'order2'] })
    })
  })

  describe('addItemToCart', () => {
    it('should add an item to the cart and return the updated order', async () => {
      req.params.customerId = 'testCustomerId'
      req.body = {
        restaurantId: 'testRestaurantId',
        dishId: 'testDishId',
        quantity: 2,
        note: 'Extra sauce'
      }
      Item.findOne.mockResolvedValue({
        dish: { _id: 'testDishId', price: 10 }
      })
      Order.findOneAndUpdate.mockResolvedValue({
        _id: 'testOrderId',
        price: 20,
        save: jest.fn()
      })
      await customerController.addItemToCart(req, res)
      expect(Item.findOne).toHaveBeenCalledWith({ 'dish._id': 'testDishId' })
      expect(Order.findOneAndUpdate).toHaveBeenCalledWith(
        {
          customer: 'testCustomerId',
          restaurant: 'testRestaurantId',
          status: 'Pending'
        },
        {
          $push: {
            items: {
              'dish._id': 'testDishId',
              quantity: 2,
              price: 20,
              note: 'Extra sauce'
            }
          }
        },
        { new: true, upsert: true }
      )
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Item added to cart successfully',
        order: expect.objectContaining({
          _id: 'testOrderId',
          price: 40
        })
      }))
    })

    it('should handle dish not found and return status 404', async () => {
      req.params.customerId = 'testCustomerId'
      req.body = {
        restaurantId: 'testRestaurantId',
        dishId: 'testDishId',
        quantity: 2,
        note: 'Extra sauce'
      }
      Item.findOne.mockResolvedValue(null)
      await customerController.addItemToCart(req, res)
      expect(Item.findOne).toHaveBeenCalledWith({ 'dish._id': 'testDishId' })
      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'Dish not found' })
    })

    it('should handle errors and return status 500', async () => {
      req.params.customerId = 'testCustomerId'
      req.body = {
        restaurantId: 'testRestaurantId',
        dishId: 'testDishId',
        quantity: 2,
        note: 'Extra sauce'
      }
      Item.findOne.mockRejectedValue(new Error('Database error'))
      await customerController.addItemToCart(req, res)
      expect(Item.findOne).toHaveBeenCalledWith({ 'dish._id': 'testDishId' })
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' })
    })
  })

  describe('acceptOrder', () => {
    let req, res
    beforeEach(() => {
      req = { params: { orderId: 'testOrderId' } }
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      }
    })

    it('should accept the order when status is "Pending"', async () => {
      const updatedOrder = { _id: 'testOrderId', status: 'Accepted' }
      Order.findOneAndUpdate.mockResolvedValue(updatedOrder)
      await customerController.acceptOrder(req, res)
      expect(updatedOrder.status).toBe('Accepted')
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'Order accepted successfully', order: updatedOrder })
    })

    it('should return 404 error when order ID is invalid or order is already accepted', async () => {
      Order.findOneAndUpdate.mockResolvedValue(null)
      await customerController.acceptOrder(req, res)
      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'Order not found or already accepted' })
    })

    it('should return 500 error when an error occurs during acceptance process', async () => {
      const errorMessage = 'Internal server error'
      Order.findOneAndUpdate.mockRejectedValue(new Error(errorMessage))
      await customerController.acceptOrder(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage })
    })
  })

  describe('cancelOrder', () => {
    let req, res
    beforeEach(() => {
      req = { params: { orderId: 'testOrderId' } }
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      }
    })

    it('should cancel the order when status is "Accepted"', async () => {
      const order = { _id: 'testOrderId', status: 'Accepted', save: jest.fn() }
      Order.findById.mockResolvedValue(order)
      await customerController.cancelOrder(req, res)
      expect(order.status).toBe('Canceled')
      expect(order.save).toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'Order canceled successfully', order })
    })

    it('should cancel the order when status is "Preparing"', async () => {
      const order = { _id: 'testOrderId', status: 'Preparing', save: jest.fn() }
      Order.findById.mockResolvedValue(order)
      await customerController.cancelOrder(req, res)
      expect(order.status).toBe('Canceled')
      expect(order.save).toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'Order canceled successfully', order })
    })

    it('should return 404 error when order ID is invalid', async () => {
      Order.findById.mockResolvedValue(null)
      await customerController.cancelOrder(req, res)
      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'Order not found' })
    })

    it('should return 500 error when an error occurs during cancellation process', async () => {
      const errorMessage = 'Internal server error'
      Order.findById.mockRejectedValue(new Error(errorMessage))
      await customerController.cancelOrder(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage })
    })
  })

  describe('removeItemFromCart', () => {
    let req, res
    beforeEach(() => {
      req = { body: {} }
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      }
    })

    it('should remove an item from the cart and return the updated order', async () => {
      req.body.customerId = 'testCustomerId'
      req.body.restaurantId = 'testRestaurantId'
      req.body.itemId = 'testItemId'
      const mockOrder = {
        _id: 'testOrderId',
        customer: 'testCustomerId',
        restaurant: 'testRestaurantId',
        status: 'Pending',
        items: [
          { _id: 'testItemId', price: 10, quantity: 2 }
        ],
        total_price: 20,
        save: jest.fn()
      }
      Order.findOne.mockResolvedValue(mockOrder)
      await customerController.removeItemFromCart(req, res)
      expect(Order.findOne).toHaveBeenCalledWith({ customer: 'testCustomerId', restaurant: 'testRestaurantId', status: 'Pending' })
      expect(mockOrder.items.length).toBe(0)
      expect(mockOrder.total_price).toBe(0)
      expect(mockOrder.save).toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'Item removed from cart successfully', order: mockOrder })
    })

    it('should handle item not found in cart and return status 404', async () => {
      req.body.customerId = 'testCustomerId'
      req.body.restaurantId = 'testRestaurantId'
      req.body.itemId = 'nonExistingItemId'
      Order.findOne.mockResolvedValue(null)
      await customerController.removeItemFromCart(req, res)
      expect(Order.findOne).toHaveBeenCalledWith({ customer: 'testCustomerId', restaurant: 'testRestaurantId', status: 'Pending' })
      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'Order not found or already processed' })
    })

    it('should handle errors and return status 500', async () => {
      req.body.customerId = 'testCustomerId'
      req.body.restaurantId = 'testRestaurantId'
      req.body.itemId = 'testItemId'
      Order.findOne.mockRejectedValue(new Error('Database error'))
      await customerController.removeItemFromCart(req, res)
      expect(Order.findOne).toHaveBeenCalledWith({ customer: 'testCustomerId', restaurant: 'testRestaurantId', status: 'Pending' })
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' })
    })
  })

  describe('getPendingOrders', () => {
    let req, res
    beforeEach(() => {
      req = { params: {}, body: {} }
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      }
    })

    it('should get an order with the status pending', async () => {
      req.params.customerId = 'testCustomerId'
      req.params.restaurantId = 'testRestaurantId'
      const mockOrder = {
        _id: 'testOrderId',
        customer: 'testCustomerId',
        restaurant: 'testRestaurantId',
        status: 'Pending',
        items: [
          { _id: 'testItemId', price: 10, quantity: 2 }
        ],
        total_price: 20,
        save: jest.fn()
      }
      Order.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockOrder)
      })
      await customerController.getPendingOrders(req, res)
      expect(Order.find).toHaveBeenCalledWith({ customer: 'testCustomerId', restaurant: 'testRestaurantId', status: 'Pending' })
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ orders: mockOrder })
    })
  })
})
