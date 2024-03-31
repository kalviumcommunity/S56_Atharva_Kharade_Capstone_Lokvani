const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { router } = require("./Routes");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.Mongo_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((error) => console.error("Failed to connect to mongodb", error));

app.use(router);
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
