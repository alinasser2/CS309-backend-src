const Paintings = require('../models/Painting');
const Purchase = require("../models/Purchase");
const User = require('../models/User');
const Cart = require('../models/Cart');
let sum = 0;


const purchase = async (req, res) => {
    const user_id = req.cookies.access_token.id
    const findAllItems = await Cart.find({ user_id: user_id })
    const user = await User.findById(user_id)
    const userMoney = user.money

    //calculate total money of cart's items
    for (const item of findAllItems) {
        const paint_id = item.painting_id
        const qnt = item.quantity
        const paint = await Paintings.findById(paint_id)
        sum += qnt * paint.price
    }

    //validate sum with user money
    if (sum > userMoney) {
        sum = 0
        return res.status(501).send({ status: "error", message: "not enough money" })
    }
    //create to purchase object
    const addPurchase = createPurchase({ user_id: user_id, total_cash: sum })
    //update user's money
    user.money -= sum;

    try {
        //add purchase
        const savedPurchase = await addPurchase.save()
        //update user
        const updateUser = await User.findOneAndUpdate({ _id: user_id }, user)
        //delete items from cart
        const deletedCart = await Cart.deleteMany({ user_id: user_id })

        sum = 0
        res.status(200).send({ status: "ok", purchase: savedPurchase, user: updateUser, cart: deletedCart })
    } catch (error) {
        sum = 0
        const err = error.message
        res.status(501).send({ status: "error", message: err })
    }
}


const getPurchases = async (req, res) => {
    const userPurchases = await Purchase.find({ user_id: req.cookies.access_token.id });
    res.status(200).json({ status:"ok", userPurchases, userPurchasesCount: userPurchases.length });
}

const createPurchase = (data) => {
    return new Purchase({
        user_id: data.user_id,
        total_cash: data.total_cash
    });
}

module.exports = {
    getPurchases,
    purchase
}