const express = require("express");
const cors = require("cors");

const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');
const restaurantRoutes = require('./routes/restaurant');
const riderRoutes = require('./routes/rider');


require("dotenv").config();

const connectToMongo = require("./db/connection");

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/images', express.static("uploads"));
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/customer', customerRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/rider', riderRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

app.get("/test", (req, res) => {
  res.json(
    "Server connection to client works!! Good Luck with your capstones :D"
  );
});

module.exports = app;
