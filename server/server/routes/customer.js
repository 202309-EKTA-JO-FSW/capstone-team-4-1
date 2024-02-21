const express  = require("express");
const router = express.Router();
//const customerModel = require("../models/customer");

const customerController = require("../controllers/customer");

router.get("/",customerController.proveOfLife);
//router.post('/signup', customerController.signup);
//router.post("/signin", customerController.signin);
//router.post("/signout", customerController.signout);

router.get("/restaurants", customerController.getAllRestaurants);
router.get("/restaurant/:id", customerController.getRestaurantById);
router.get('/restaurants/:restaurantId/dishes', customerController.getAllDishesFromRestaurant);
//router.get('/restaurants/:restaurantId/dishes/:dishId', customerController.getDishByIdFromRestaurant);
//router.get('/dishes', customerController.getAllDishes);
//router.get("/filter", customerController.filterItems);


router.post('/cart', customerController.addItemToCart);
router.delete('/cart', customerController.removeItemFromCart);
router.put('/orders/:orderId/accept', customerController.acceptOrder);
//To get the cart:
router.get('/orders/pending/:customerId/:restaurantId', customerController.getPendingOrders);
router.put('/orders/:orderId/cancel', customerController.cancelOrder);
router.get('/orders', customerController.getAllOrders);


//router.get("/customers" , getAllCustomers = async (_, res) => {
 //   const customers = await customerModel.find({});
  //  res.json(customers);
//});


module.exports = router;