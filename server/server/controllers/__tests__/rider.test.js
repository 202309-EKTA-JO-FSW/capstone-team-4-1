const Order = require("../models/order");
jest.mock("../models/order"); 

const riderController = require('../controllers/rider');

const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    send: jest.fn(),
};

describe("riderController.getOrders", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return orders for a valid rider ID and status", async () => {
        const req = {
            query: { status: "Pending" },
            params: { riderId: "rider123" },
        };
        Order.find.mockResolvedValue([{ _id: "order123", rider: "rider123", status: "Pending" }]);

        await riderController.getOrders(req, res);

        expect(Order.find).toHaveBeenCalledWith({ rider: "rider123", status: "Pending" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ _id: "order123", rider: "rider123", status: "Pending" }]);
    });

    it("should return 400 if the status is invalid", async () => {
        const req = {
            query: { status: "InvalidStatus" },
            params: { riderId: "rider123" },
        };

        await riderController.getOrders(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid Status" });
    });

    it("should handle errors gracefully", async () => {
        const req = {
            query: {},
            params: { riderId: "rider123" },
        };
        Order.find.mockRejectedValue(new Error("Database error"));

        await riderController.getOrders(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Database error");
    });
});


describe("riderController.getOrder", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return a specific order for a valid rider ID and order ID", async () => {
        const req = {
            params: { orderId: "order123", riderId: "rider123" },
        };
        Order.findOne.mockResolvedValue({ _id: "order123", rider: "rider123" });

        await riderController.getOrder(req, res);

        expect(Order.findOne).toHaveBeenCalledWith({ _id: "order123", rider: "rider123" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    it("should return 404 if the order is not found or does not belong to the rider", async () => {
        const req = {
            params: { orderId: "orderNotExist", riderId: "rider123" },
        };
        Order.findOne.mockResolvedValue(null);

        await riderController.getOrder(req, res);

        expect(Order.findOne).toHaveBeenCalledWith({ _id: "orderNotExist", rider: "rider123" });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Order not found or does not belong to rider" });
    });

    it("should handle errors gracefully", async () => {
        const req = {
            params: { orderId: "order123", riderId: "rider123" },
        };
        Order.findOne.mockRejectedValue(new Error("Database error"));

        await riderController.getOrder(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Database error");
    });
});
