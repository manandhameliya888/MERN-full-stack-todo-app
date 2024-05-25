const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const cors = require('cors');
require("dotenv").config();

connectDb();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");
  next();
});

// app.use are middlewares and this middleware is for routing todo api
app.use("/api/todo", require("./routes/todoRoutes"));

app.use("/api/users", require("./routes/userRoutes"));

// This custom middleware is for handling the errors
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
