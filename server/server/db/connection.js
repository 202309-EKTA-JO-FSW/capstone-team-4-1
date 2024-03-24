const mongoose = require("mongoose");

const DB_URI = `mongodb+srv://hadeelobaid71:AZ7t0yPz0vhXECaT@cluster0.v13dwp2.mongodb.net/`;

const url = DB_URI;
console.log(  "mongooseURL",url)

const connectToMongo = () => {
  mongoose.connect(url, { useNewUrlParser: true });
  db = mongoose.connection;

  db.once("open", () => {
    console.log("Database connected: ", url);
  });

  db.on("error", (err) => {
    console.error("Database connection error: ", err);
  });
};

module.exports = connectToMongo;
