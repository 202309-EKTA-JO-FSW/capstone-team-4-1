const express = require('express');
const multer = require('multer');
const router = express.Router();
const authController = require('../controllers/auth');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '-' + file.originalname);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/register', authController.registerAdmin);
router.post('/customer/register', upload.single('img'), authController.registerCustomer);
router.post('/restaurant/register', authController.registerRestaurant);
router.post('/rider/register', authController.registerRider);
router.post('/login', authController.login);

module.exports = router;