const Painting = require('../models/Painting');
const User = require("../models/User");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res) => {
  if (req.body.password.length < 6)
    return res.status(501).send({ status: "error", message: "password is too short" });
  const findEmail = await User.findOne({ email: req.body.email });
  if (findEmail)
    return res.status(501).send({ status: "error", message: "email already exists" })
  const addUser = await createUser(req);
  if (req.body.admin) addUser.money = 10000;
  try {
    const savedUser = await addUser.save();
    res.status(201).send({ status: "ok", message: "User Created Successfully", user: savedUser });
  } catch (error) {
    const err = error.message;
    res.status(501).send({ status: "error", message: err });
  }
};



const login = async (req, res) => {
  const findUser = await User.findOne({ email: req.body.email });
  const userPass = findUser && findUser.password;
  const decodedPass = userPass && await bcrypt.compare(req.body.password, userPass);

  if (findUser && decodedPass) {
    const accessToken = jwt.sign(
      {
        id: findUser._id,
        admin: findUser.admin,
      },
      process.env.JWT_KEY,
      { expiresIn: "2d" }
    );
    res.cookie("access_token", { accessToken: accessToken, id: findUser._id }, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    })
    res
      .status(200)
      .header('auth-token', accessToken)
      .send({
        status: "ok",
        message: "User logged In",
        User: findUser,
        Token: accessToken,
      });
  } else {
    res
      .status(500)
      .send({ status: "error", message: "email or password is wrong!" });
  }
};

const logout = async (req, res) => {
  //check if user logged-in
  const isLogged = req.cookies.access_token
  if(!isLogged)
    return res.status(404).send({ status: "error", message: "no logged-in user!!" })
  const currUser_id = isLogged.id;
  const currUser_Cart = await Cart.find({ user_id: currUser_id });
  //loop on every item added by currUser and update paintings quantity
  for (const item of currUser_Cart) {
    const paint_id = item.painting_id;
    const cart_qnt = item.quantity;
    const painting = await Painting.findById(paint_id);
    painting.quantity += cart_qnt;
    await Painting.updateOne({_id: paint_id}, {quantity: painting.quantity});
  }
  //delete all user's items in cart
  try {
    const deleteFromCart = await Cart.deleteMany({ user_id: currUser_id });
    //deleteFromCart.deletedCount !=0 incase items deleted
  } catch (error) {
    const err = error.message;
    return res.status(501).send({ status: "error", message: err });
  }
  res.cookie('access_token', '', { maxAge: 1 });
  res.status(201).send({ status: "ok", message: "User LoggedOut Successfully" });
};


const createUser = async (req) => {
  const hashPassword = await bcrypt.hashSync(req.body.password, 10);
  return new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    city: req.body.city,
    state: req.body.state,
    phone_number: req.body.phone_number,
    money: Math.floor(Math.random() * (10000 - 1000) + 1000),
    adress: req.body.adress,
    admin: req.body.admin,
  });
}

module.exports = {
  register,
  logout,
  login
};