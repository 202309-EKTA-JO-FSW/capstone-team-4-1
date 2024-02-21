const adminController = require('../admin');
const Restaurant = require('../../models/restaurant')
const Rider = require('../../models/rider');
const Order = require('../../models/order');
const Customer = require('../../models/customer');


jest.mock('../../models/restaurant');
jest.mock('../../models/rider');
jest.mock('../../models/order');
jest.mock('../../models/customer');

describe('AdminController', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getRestaurants', () => {
    it('should return all restaurants', async () => {
      Restaurant.find.mockResolvedValue(['restaurant1', 'restaurant2']);
      await adminController.getRestaurants(req, res);
      expect(res.json).toHaveBeenCalledWith(['restaurant1', 'restaurant2']);
    });

    it('should return a restaurant by id', async () => {
      req.params.id = 'testId';
      Restaurant.findById.mockResolvedValue('restaurant1');
      await adminController.getRestaurants(req, res);
      expect(res.json).toHaveBeenCalledWith('restaurant1');
    });
  });

  describe('getRiders', () => {
    it('should return all riders', async () => {
      Rider.find.mockResolvedValue(['rider1', 'rider2']);
      await adminController.getRiders(req, res);
      expect(res.json).toHaveBeenCalledWith(['rider1', 'rider2']);
    });

    it('should return a rider by id', async () => {
      req.params.id = 'testId';
      Rider.findById.mockResolvedValue('rider1');
      await adminController.getRiders(req, res);
      expect(res.json).toHaveBeenCalledWith('rider1');
    });
  });

  describe('getOrders', () => {
    it('should return all orders', async () => {
      Order.find.mockResolvedValue(['order1', 'order2']);
      await adminController.getOrders(req, res);
      expect(res.json).toHaveBeenCalledWith(['order1', 'order2']);
    });

    it('should return an order by id', async () => {
      req.params.id = 'testId';
      Order.findById.mockResolvedValue('order1');
      await adminController.getOrders(req, res);
      expect(res.json).toHaveBeenCalledWith('order1');
    });
  });

  describe('getCustomers', () => {
    it('should return all customers', async () => {
      Customer.find.mockResolvedValue(['customer1', 'customer2']);
      await adminController.getCustomers(req, res);
      expect(res.json).toHaveBeenCalledWith(['customer1', 'customer2']);
    });

    it('should return a customer by id', async () => {
      req.params.id = 'testId';
      Customer.findById.mockResolvedValue('customer1');
      await adminController.getCustomers(req, res);
      expect(res.json).toHaveBeenCalledWith('customer1');
    });
  });

  describe('addRestaurant', () => {
    it('should create a new restaurant', async () => {
      const newRestaurant = { name: 'New Restaurant', location: 'New Location' };
      req.body = newRestaurant;
      Restaurant.create.mockResolvedValue(newRestaurant);
      await adminController.addRestaurant(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newRestaurant);
    });
  });

  describe('addRider', () => {
    it('should create a new rider', async () => {
      const newRider = { name: 'New Rider', phone: '1234567890' };
      req.body = newRider;
      Rider.create.mockResolvedValue(newRider);
      await adminController.addRider(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newRider);
    });
  });

  describe('updateRestaurant', () => {
    it('should update a restaurant by id', async () => {
      const updatedRestaurant = { name: 'Updated Restaurant', location: 'Updated Location' };
      req.params.id = 'testId';
      req.body = updatedRestaurant;
      Restaurant.findByIdAndUpdate.mockResolvedValue(updatedRestaurant);
      await adminController.updateRestaurant(req, res);
      expect(res.json).toHaveBeenCalledWith(updatedRestaurant);
    });
  });

  describe('updateRider', () => {
    it('should update a rider by id', async () => {
      const updatedRider = { name: 'Updated Rider', phone: '0987654321' };
      req.params.id = 'testId';
      req.body = updatedRider;
      Rider.findByIdAndUpdate.mockResolvedValue(updatedRider);
      await adminController.updateRider(req, res);
      expect(res.json).toHaveBeenCalledWith(updatedRider);
    });
  });

  describe('updateOrder', () => {
    it('should update an order by id', async () => {
      const updatedOrder = { status: 'Delivered' };
      req.params.id = 'testId';
      req.body = updatedOrder;
      Order.findByIdAndUpdate.mockResolvedValue(updatedOrder);
      await adminController.updateOrder(req, res);
      expect(res.json).toHaveBeenCalledWith(updatedOrder);
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer by id', async () => {
      const updatedCustomer = { name: 'Updated Customer', email: 'updated@example.com' };
      req.params.id = 'testId';
      req.body = updatedCustomer;
      Customer.findByIdAndUpdate.mockResolvedValue(updatedCustomer);
      await adminController.updateCustomer(req, res);
      expect(res.json).toHaveBeenCalledWith(updatedCustomer);
    });
  });

  describe('removeRestaurant', () => {
    it('should delete a restaurant by id', async () => {
      req.params.id = 'testId';
      Restaurant.findByIdAndDelete.mockResolvedValue({ _id: 'testId' });
      await adminController.removeRestaurant(req, res);
      expect(res.status).toHaveBeenCalledWith(204);
    });
  });

  describe('removeRider', () => {
    it('should delete a rider by id', async () => {
      req.params.id = 'testId';
      Rider.findByIdAndDelete.mockResolvedValue({ _id: 'testId' });
      await adminController.removeRider(req, res);
      expect(res.status).toHaveBeenCalledWith(204);
    });
  });

  describe('removeOrder', () => {
    it('should delete an order by id', async () => {
      req.params.id = 'testId';
      Order.findByIdAndDelete.mockResolvedValue({ _id: 'testId' });
      await adminController.removeOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(204);
    });
  });
});