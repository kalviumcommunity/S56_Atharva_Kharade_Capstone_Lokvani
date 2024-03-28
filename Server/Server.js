const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const { connectDB } = require("./db.js");
const router = require("./Routes");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.json({
      database: connectDB() ? "connected" : "disconnected",
    });
  } catch (err) {
    console.log(err);
  }
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
