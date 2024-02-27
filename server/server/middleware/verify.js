
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' }); 
  }
};

const verifyCustomer = (req, res, next) => {
  if (req.user && req.user.role === 'Customer') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' }); 
  }
};

const verifyRestauarant = (req, res, next) => {
  console.log("This is what we have now:", req.user)
  if (req.user && req.user.role === 'Restaurant') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' }); 
  }
};

const verifyRider = (req, res, next) => {
  if (req.user && req.user.role === 'Rider') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' }); 
  }
};


module.exports = { verifyAdmin, verifyCustomer, verifyRestauarant, verifyRider };