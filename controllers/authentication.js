const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

router.post('/signup', async (req, res) => {
    if(req.body.password.length < 6)
        return res.status(501).send({message: "password is too short"});
        const hashedPass = await bcrypt.hash(req.body.password, 10);
            const addUser = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            city: req.body.city,
            state: req.body.state,
            phone_number: req.body.phone_number,
            money: Math.floor(Math.random() * (10000 - 1000) + 1000),
            adress: req.body.adress,
            admin: req.body.admin
        })
    try{
        const savedUser = await addUser.save();
        res.status(201).send({message: "User Created", user: savedUser})
    } catch (error) {
        const err = error.message
        res.status(501).send({message: "error", error: err});
    }
})

router.post("/login", async (req, res) => {
  const findUser = await User.findOne({ email: req.body.email })
  if (!findUser) res.status(200).send({ message: "User Not Found" })
  else 
  {
    const { userName, userPass } = 
    {
      userName: findUser.username,
      userPass: findUser.password,
    };
    const decodedPass = await bcrypt.compare(req.body.password, userPass);
    if (req.body.username == userName && decodedPass) {
      const accessToken = jwt.sign(
        {
          id: findUser._id,
          admin: findUser.admin,
        },
        process.env.JWT_KEY,
        { expiresIn: "2d" }
      )
      res.status(200).send({message: "User logged In", User: findUser,Token: accessToken })
    }
    else
    {
        res.status(500).send({message: "username or password is wrong!"})
    }
  }
})

module.exports = router