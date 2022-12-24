const { deleteFromCart, getUserItems, addPainting, addToCart } = require('../controllers/cart')
const { admin, currUserOradmin } = require("../middleware/authorization ")
const verifyToken = require("../middleware/TokenVerification")
const express = require('express')
const router = express.Router()

router.delete('/delete/:id', [verifyToken, currUserOradmin], deleteFromCart)
router.get('/getItems', [verifyToken, currUserOradmin], getUserItems)
router.post('/add/:id/:qnt', [verifyToken], addToCart)

module.exports = router