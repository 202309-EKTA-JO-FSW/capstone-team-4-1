
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' }); 
  }
};

const verifyCustomer = (req, res, next) => {
  if (req.user && req.user.role === 'customer') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' }); 
  }
};

const verifyRestauarant = (req, res, next) => {
  console.log("This is what we have now:", req.user)
  if (req.user && req.user.role === 'restaurant') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' }); 
  }
};

const verifyRider = (req, res, next) => {
  if (req.user && req.user.role === 'rider') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' }); 
  }
};


module.exports = { verifyAdmin, verifyCustomer, verifyRestauarant, verifyRider };