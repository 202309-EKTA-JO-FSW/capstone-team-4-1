const mongoose = require("mongoose");

const DB_URI = `mongodb+srv://vercel-admin-user:AJ1RhSuxzLlMKaM8@cluster0.v13dwp2.mongodb.net/`;

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
