const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Database Connection Unsuccessful");
    console.error(err);
    process.exit(1);
  }
};

const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

module.exports = { connectDB, isConnected };
