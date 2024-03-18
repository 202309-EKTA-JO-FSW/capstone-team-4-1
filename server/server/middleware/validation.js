const Customer = require('../models/customer');

const validateCustomerData = (req, res, next) => {
    const { firstName, lastName, email, password, phone, location, street, buildingNo, img, role } = req.body;
  
    const user = new Customer({ firstName, lastName, email, password, phone, location, street, buildingNo, img, role });
  
    const validationError = user.validateSync(); // Validate the user object synchronously
    
    if (validationError) {
      const errors = Object.values(validationError.errors).map(error => error.message);
      res.status(400).json({ errors });
    } else {
      next();
    }
};

module.exports = { validateCustomerData };
  