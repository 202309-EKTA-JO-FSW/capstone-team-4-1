const restaurantController = require('./restaurant');
const Order = require('../models/order');
const Dish = require('../models/item_dish');


jest.mock('../models/restaurant');
jest.mock('../models/order');
jest.mock('../models/item_dish');


describe('Restaurant Controller', () => {
    let req, res;
  
    beforeEach(() => {
      req = { params: {}, body: {} };
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    describe('getAllDishes', () => {
        it('should return all dish for a specific restaurant', async () => {
            req.params = { restaurantId: 'testId' };
            Dish.find.mockResolvedValue(['dish1', 'dish2']);
            await restaurantController.getAllDishes(req, res);
            expect(res.json).toHaveBeenCalledWith(['dish1', 'dish2']);
        });
    });

    describe('getDish', () => {
        it('should return a dish by id', async () => {
            req.params.id = 'testId';
            Dish.findById.mockResolvedValue('dish1');
            await restaurantController.getDish(req, res);
            expect(res.json).toHaveBeenCalledWith('dish1');
        });
    });

    describe('getOrders', () => {
        it('should return all orders for a specific restaurant id', async () => {
            req.params.id = { restaurantId: 'testId' };
            Order.find.mockResolvedValue(['order1', 'orders2']);
            await restaurantController.getOrders(req, res);
            expect(res.json).toHaveBeenCalledWith(['order1', 'orders2']);
        });
    });

    describe('getOrder', () => {
        it('should return an order by id', async () => {
            req.params.id = 'testId';
            Order.findById.mockResolvedValue('order1');
            await restaurantController.getOrder(req, res);
            expect(res.json).toHaveBeenCalledWith('order1');
        });
    });

    describe('filterOrders', () => {
        it('should filter orders by status', async () => {
          const order = { status: 'Preparing' };
          req.query = order;
          Order.find.mockResolvedValue(order);
          await restaurantController.filterOrders(req, res);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(order);
        });
    });

    describe('addDish', () => {
        it('should create a new dish', async () => {
          const newDish = { restaurant: '123', title: 'New Dish', price: 25 };
          req.body = newDish;
          Dish.create.mockResolvedValue(newDish);
          await restaurantController.addDish(req, res);
          expect(res.status).toHaveBeenCalledWith(201);
          expect(res.json).toHaveBeenCalledWith({ message: "Dish created successfully" });
        });
    });

    describe('updateDish', () => {
        it('should update a dish by id', async () => {
          const updatedDish = { price: 17 };
          req.params.id = 'testId';
          req.body = updatedDish;
          Dish.findByIdAndUpdate.mockResolvedValue(updatedDish);
          await restaurantController.updateDish(req, res);
          expect(res.json).toHaveBeenCalledWith({ message: "Dish updated successfully" });
        });
    });

    describe('removeDish', () => {
        it('should delete a dish by id', async () => {
          req.params.id = 'testId';
          Dish.findByIdAndDelete.mockResolvedValue({ _id: 'testId' });
          await restaurantController.removeDish(req, res);
          expect(res.status).toHaveBeenCalledWith(202);
        });
    });

});

