const mongoose = require("mongoose");
const express = require("express");
require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")

const app = express();

port =process.env.PORT || 8000;

// connection to db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB IS CONNECTED");
  })
  .catch(() => {
    console.log("SOMETHIG IS WRONG IN CONNECTION TO DB");
  });

  // middeleware
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(cors())

  // My routes

  app.use('/api',authRoutes)
  app.use('/api',userRoutes)
  app.use('/api',categoryRoutes)
  app.use('/api',productRoutes)

// listening server
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
