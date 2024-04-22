const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

connectDB();

const app = express();

app.get("/health", (req, res) => {
  console.log("I am in health api");
  res.json({
    service: "Backend Job Listing API Server",
    status: "active",
    time: new Date(),
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("port is running on ", PORT);
});
