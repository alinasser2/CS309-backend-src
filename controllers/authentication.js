const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

router.post("/signup", async (req, res) => {
  if (req.body.password.length < 6)
    return res.status(501).send({ status: "error",  message: "password is too short" });
  const addUser = await createUser(req);
  if (req.body.admin) addUser.money = 10000;
  try {
    const savedUser = await addUser.save();
    res
      .status(201)
      .send({ status: "ok", message: "User Created Successfully", user: savedUser });
  } catch (error) {
    const err = error.message;
    res.status(501).send({ status: "error", message: err });
  }
});



router.post("/login", async (req, res) => {
  const findUser = await User.findOne({ email: req.body.email });
  const userPass = findUser && findUser.password;
  const decodedPass =userPass && await bcrypt.compare(req.body.password, userPass);
  if (findUser && decodedPass) 
  {
    const accessToken = jwt.sign(
      {
        id: findUser._id,
        admin: findUser.admin,
      },
      process.env.JWT_KEY,
      { expiresIn: "2d" }
    );
    res.cookie("access_token", {accessToken: accessToken, id: findUser._id}, {
      httpOnly: true,
      maxAge: 1000*60*60*24
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
});

router.get('/logout', async(req, res) => {
  
  res.cookie('access_token', '', {maxAge: 1})
  res
      .status(201)
      .send({ status: "ok", message: "User LoggedOut Successfully"});
})


const createUser = async (req) =>{
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

module.exports = router;