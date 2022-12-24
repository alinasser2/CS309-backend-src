const { admin, currUserOradmin } = require("../middleware/authorization ")
const { getPurchases, purchase } = require('../controllers/purchase')
const verifyToken = require("../middleware/TokenVerification")
const exprees = require('express')
const router = exprees.Router()

router.get('/getPurchases', [verifyToken, currUserOradmin], getPurchases)
router.get('/', [verifyToken, currUserOradmin], purchase)

module.exports = router