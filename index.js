<<<<<<< HEAD
const authRoute = require("./controllers/authentication");
const userRoute = require("./controllers/user");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
=======
const authRoute = require("./controllers/authentication")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
require('./database/database')
const cors = require('cors')
const app = express()
dotenv.config()
>>>>>>> 42ed0dafb4fa5b3207417f75105944b4e37589bd

app.use(express.json());
app.use(cookieParser());
app.use(cors());

<<<<<<< HEAD
mongoose.set("strictQuery", false);
=======


app.use(express.json())
app.use(cors())

mongoose.set('strictQuery', false)
>>>>>>> 42ed0dafb4fa5b3207417f75105944b4e37589bd
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}!`);
});
