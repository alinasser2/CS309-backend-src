const authRoute = require("./controllers/authentication");
const userRoute = require("./controllers/user");
const productRoute = require("./controllers/product");
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

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}!`);
});

app.get("/",productRoute.homepage);
app.get("/add_product" , productRoute.paint_create_get);
app.post("/add_product" , productRoute.Paint_create_post);
app.get("/product/:id", productRoute.productpage);
app.delete("/paint_delete/:id", productRoute.paint_delete);


app.use((req, res) => {
  res.status(404).send('404', { title: '404' });
});
