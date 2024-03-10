const customerController = require('../customer');
const Restaurant = require('../../models/restaurant');
const Order = require('../../models/order');
const Dish = require('../../models/dish');

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

  describe('getAllOrdersByCustomerId', () => {
    it('should return all orders for a customer', async () => {
      req.params.customerId = 'testCustomerId'
      Order.find.mockResolvedValue(['order1', 'order2'])
      Order.find = jest.fn().mockResolvedValue(['order1', 'order2'])
      await customerController.getAllOrdersByCustomerId(req, res)
      expect(res.json).toHaveBeenCalledWith({ orders: ['order1', 'order2'] })
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