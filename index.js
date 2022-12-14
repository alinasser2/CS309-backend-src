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


//requering DB files
const User = require('./models/User')
const Cart = require('./models/Cart')
const Paintings = require('./models/Painting')
const purchases = require('./models/Purchase')


app.use(express.json())
app.use(cors())

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}!`);
});