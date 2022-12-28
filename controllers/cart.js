const Painting = require('../models/Painting');
const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
  const painting_id = req.params.id;
  const painting_qnt = req.params.qnt;
  const currUser_id = req.cookies.access_token.id
  const findPainting = await Painting.findById(painting_id);

  if (!findPainting)
    return res.status(404).send({ status: "error", message: "painting not found!!" });
  if (findPainting.quantity < painting_qnt)
    return res.status(500).send({ status: "error", message: "not enough quantity!!" });

  //update painting
  findPainting.quantity -= painting_qnt;
  const updatePainting = await Painting.findOneAndUpdate({ _id: painting_id }, findPainting)

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
}


const deleteFromCart = async (req, res) => {
  const painting_id = req.params.id
  const currUser_id = req.cookies.access_token.id
  const findPainting_fromCart = await Cart.findOne({ painting_id: painting_id })

  if (!findPainting_fromCart)
    return res.status(404).send({ status: "error", message: "painting not found!!" })

  //re-update painting quantity
  const findPainting = await Painting.findById(painting_id)
  findPainting.quantity += findPainting_fromCart.quantity
  await findPainting.save()

  try {
    const deleteFromCart = await Cart.deleteOne({ user_id: currUser_id, painting_id: findPainting_fromCart.painting_id })
    if (deleteFromCart.deletedCount != 0)
      res.status(200).send({ status: "ok", message: "item deleted from cart", item: deleteFromCart })
    else
      res.status(404).send({ status: "ok", message: "nothing to delete from cart", item: deleteFromCart })
  } catch (error) {
    const err = error.message
    res.status(501).send({ status: "error", message: err })
  }
}


const getUserItems = async (req, res) => {
  const currUser_id = req.cookies.access_token.id
  const findUserItems = await Cart.find({ user_id: currUser_id })
  if (findUserItems.length == 0)
    return res.status(404).send({ status: "error", message: "user has no items in cart!!" });
  res.status(200).send({ status: "ok", message: "items from cart", items: findUserItems })
}


const addPainting = async (req, res) => {
  const addPost = new Painting(req.body)
  const added = await addPost.save();
  res.status(200).send({ added })
}


module.exports = {
  deleteFromCart,
  getUserItems,
  addPainting,
  addToCart
}