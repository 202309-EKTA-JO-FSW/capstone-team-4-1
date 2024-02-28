const riderController = require('../rider');
const Order = require('../../models/order');
const Rider = require('../../models/rider');

jest.mock('../../models/order', () => ({
	find: jest.fn(),
	findOne: jest.fn(),
}));

jest.mock('../../models/rider', () => ({
	find: jest.fn(),
	findByIdAndUpdate: jest.fn(),
}));

describe('Rider Controller', () => {
	let req, res;

	beforeEach(() => {
		req = { params: {}, query: {}, body: {} };
		res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};
	});

	describe('getOrders', () => {
		it('should return all orders for a specific rider id with a valid status', async () => {
			req.params.riderId = 'riderTestId';
			req.query.status = 'Delivered';

			Order.find.mockImplementation(() => ({
				populate: jest.fn().mockReturnThis(),
				exec: jest.fn().mockResolvedValue(['order1', 'order2']),
			}));

			await riderController.getOrders(req, res);
			expect(Order.find).toHaveBeenCalledWith({ rider: 'riderTestId', status: 'Delivered' });
			expect(res.json).toHaveBeenCalledWith(['order1', 'order2']);
		});

		it('should return a 400 error for an invalid status', async () => {
			req.params.riderId = 'riderTestId';
			req.query.status = 'InvalidStatus';

			await riderController.getOrders(req, res);
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ message: "Invalid status value" });
		});

		it('should return all orders for a specific rider id', async () => {
			req.params.riderId = 'riderTestId';
			req.query.status = 'Delivered';

			Order.find.mockImplementation(() => ({
				populate: jest.fn().mockReturnThis(),
				exec: jest.fn().mockResolvedValue(['order1', 'order2']),
			}));

			await riderController.getOrders(req, res);
			expect(Order.find).toHaveBeenCalledWith({ rider: 'riderTestId', status: 'Delivered' });
			expect(res.json).toHaveBeenCalledWith(['order1', 'order2']);
		});
	});

	describe('getOrder', () => {
		it('should return a specific order by id for a rider', async () => {
			req.params.riderId = 'riderTestId';
			req.params.orderId = 'orderTestId'; 

			Order.findOne.mockImplementation(() => ({
				populate: jest.fn().mockReturnThis(),
				exec: jest.fn().mockResolvedValue('specificOrder'),
			}));

			await riderController.getOrder(req, res); 
			expect(Order.findOne).toHaveBeenCalledWith({ _id: 'orderTestId', rider: 'riderTestId' });
			expect(res.json).toHaveBeenCalledWith('specificOrder');
		});
	});

	describe('updateStatus', () => {
		it('should update the status of a specific rider', async () => {
			req.params.id = 'riderTestId';
			req.body = { status: 'Offline' }; 

			Rider.findByIdAndUpdate.mockResolvedValue('updatedRiderStatus');

			await riderController.updateStatus(req, res); 
			expect(Rider.findByIdAndUpdate).toHaveBeenCalledWith('riderTestId', { status: 'Offline' });
			expect(res.json).toHaveBeenCalledWith('updatedRiderStatus');
		});
	});
});
