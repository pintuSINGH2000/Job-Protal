const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const jobRoute = require("./routes/job");
const morgan = require("morgan");
const cors = require("cors");

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

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/job',jobRoute);


app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ errorMessage: "Something went wrong!" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("port is running on ", PORT);
});
