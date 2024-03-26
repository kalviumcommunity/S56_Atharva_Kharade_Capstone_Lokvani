const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI);
    console.log("Success in connecting to the database");
  } catch (error) {
    console.error("Failed to connect to the database");
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  } finally {
    process.exit(0);
  }
};

const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

module.exports = { connectDB, disconnectDB, isConnected };
