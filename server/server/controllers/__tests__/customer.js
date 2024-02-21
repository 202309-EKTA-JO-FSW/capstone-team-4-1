const customerController = require('../customer');
const Customer = require('../../models/customer');
const Restaurant = require('../../models/restaurant')
const Rider = require('../../models/rider');
const Order = require('../../models/order');
const Customer = require('../../models/customer');


jest.mock('../../models/restaurant');
jest.mock('../../models/rider');
jest.mock('../../models/order');
jest.mock('../../models/customer');

describe('CustomerController', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getAllRestaurants', () => {
    it('should return all restaurants', async () => {
      Restaurant.find.mockResolvedValue(['restaurant1', 'restaurant2']);
      await customerController.getAllRestaurants(req, res);
      expect(res.json).toHaveBeenCalledWith(['restaurant1', 'restaurant2']);
    });
  });


});