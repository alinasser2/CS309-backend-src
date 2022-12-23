const { admin, currUserOradmin } = require("../middleware/authorization ");
const verifyToken = require("../middleware/TokenVerification");
const Paintings = require('../models/Painting');
const router = require('express').Router();
const Cart = require('../models/Cart');

router.post('/add/:id/:qnt', [verifyToken], async (req, res) => {
  const painting_id = req.params.id;
  const painting_qnt = req.params.qnt;
  const currUser_id = req.cookies.access_token.id
  const findPainting = await Paintings.findById(painting_id);

  if (!findPainting)
    return res.status(404).send({ status: "error", message: "painting not found!!" });
  if (findPainting.quantity < painting_qnt)
    return res.status(500).send({ status: "error", message: "not enough quantity!!" });

  //update painting
  findPainting.quantity-=painting_qnt;
  const updatePainting = await Paintings.findOneAndUpdate({_id: painting_id}, findPainting)

  const addToCart = new Cart({
    user_id: currUser_id,
    painting_id: painting_id,
    quantity: painting_qnt
  })

  try {
    const savedToCart = await addToCart.save();
    res.status(200).send({ status: "ok", message: "item added to cart", item: savedToCart })
  } catch (error) {
    const err = error.message;
    res.status(501).send({ status: "error", message: err });
  }
});


router.delete('/delete/:id', [verifyToken, currUserOradmin], async (req, res) => {
  const painting_id = req.params.id;
  const findPainting = await Cart.findOne({ painting_id: painting_id })

  if (!findPainting)
    return res.status(404).send({ status: "error", message: "painting not found!!" });

  try {
    const deleteFromCart = await Cart.deleteOne({ painting_id: findPainting.painting_id })
    res.status(200).send({ status: "ok", message: "item deleted from cart", item: deleteFromCart })
  } catch (error) {
    const err = error.message;
    res.status(501).send({ status: "error", message: err });
  }
})


router.get('/getItems', [verifyToken, currUserOradmin], async (req, res) => {
  const currUser_id = req.cookies.access_token.id
  const findUserItems = await Cart.find({ user_id: currUser_id })
  if (findUserItems.length == 0)
    return res.status(404).send({ status: "error", message: "user has no items in cart!!" });
  res.status(200).send({ status: "ok", message: "items from cart", items: findUserItems })
})


router.post('/addPainting', async (req, res) => {
  const addPost = new Paintings(req.body)
  const added = await addPost.save();
  res.status(200).send({ added })
})


module.exports = router