const mongoose = require("mongoose");

const DB_URI = `mongodb+srv://dbAdmin:user123user@cluster0.y9vcitx.mongodb.net/`;

const url = DB_URI;
console.log(  "mongooseURL",url)

const connectToMongo = () => {
  console.log(  "connectToMongo")

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  db = mongoose.connection;
  console.log(  "db",db)

  db.once("open", () => {
    console.log("Database connected: ", url);
  });

  db.on("error", (err) => {
    console.error("Database connection error: ", err);
  });
};

module.exports = connectToMongo;
