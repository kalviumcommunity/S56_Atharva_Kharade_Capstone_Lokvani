const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connectDB } = require("./db.js");
const Router = require("./Routes.js");
const cors = require("cors");

dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.json({
      database: connectDB() ? "connected" : "disconnected",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(Router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
