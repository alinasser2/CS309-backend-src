const { getAllUsers, getCurrUser, updateUser, deleteUser, getUser } = require('../controllers/user')
const { admin, currUserOradmin } = require("../middleware/authorization ")
const verifyToken = require("../middleware/TokenVerification")
const express = require('express')
const router = express.Router()

router.patch("/update/:id", [verifyToken, currUserOradmin], updateUser)
router.delete("/delete/:id", [verifyToken, admin], deleteUser)
router.get("/getAll", [verifyToken, admin], getAllUsers)
router.get("/get/:id", [verifyToken, admin], getUser)
router.get("/currUser", verifyToken, getCurrUser)

module.exports = router