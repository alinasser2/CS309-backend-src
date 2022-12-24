const paintingsRoutes = require('./routes/paintingsRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoute = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/painting", paintingsRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}!`);
});

app.use((req, res) => {
  res.status(404).send('404', { title: '404' });
});