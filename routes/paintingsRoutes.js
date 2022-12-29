const { Paint_create_post, paint_create_get, productpage, paint_delete,
        homepage,add_Review,get_reviews , 
        paint_update, paint_search} = require('../controllers/product')
const express = require('express')
const router = express.Router()



router.post("/paint_search", paint_search)
router.patch("/paint_update/:id", paint_update)
router.delete("/paint_delete/:id", paint_delete)
router.post("/add_product", Paint_create_post)
router.get("/add_product", paint_create_get)
router.get("/product/:id", productpage)
router.get("/", homepage)
//reviews handling 
router.get("/get_reviews/:id",get_reviews)
router.post("/add_review/:id",add_Review)

module.exports = router