const router = require('express').Router();
const { ObjectId } = require("mongodb");
const Cart  = require('../models/cartModel');
const verifyToken = require('../auth/authVerify')

// get all the cart items
router.get('/items', verifyToken, async (req, res)=>{
    const userId = req.user.userId;
    try{
        const items = await Cart.find({user: userId}).populate('items.product');
        console.log(items);
        res.status(200).json({data: items[0]});
    } catch (e) {
        res.status(500).json({msg: "Internal server error"});
    }
})

/**
 * payload:: {"productId": "6587283d4fb6deaa17fd1b28"}
 */
router.post('/item/exists', verifyToken, async (req, res)=>{
    const userId = req.user.userId;
    const productId = req.body.productId;
    try{
        const cart = await Cart.findOne({user : new ObjectId(userId), 'items.product': productId});
        res.status(200).json(cart!==null);
    } catch (e) {
        res.status(500).json({msg: "Internal server error"});
    }
})

// create a new cart for a newly onboarded user(need to be called everytime a user logs in)
router.post('/create', verifyToken, async (req, res)=> {
    // userId and productId are mongodb's internal identifier
    const userId = req.user.userId;
    try {
        const cart = await Cart.findOne({user : new ObjectId(userId)});
        if(cart){
            res.json({ status: 409, message: "cart is already present for this user, you might want to update" });
        } else {
            const addedProduct = await Cart.create({
                user: userId,
                items: []
            })
            res.status(200).json(addedProduct);
        }
    } catch (error) {
        res.status(500).send('server error');
    }
})

// add/remove a item from the cart
/**
 * payload:: {
    "productId": "65871718381350d6ce3e5bcc",
    "quantity": 1
}
 */
router.put('/update', verifyToken, async(req, res)=>{
    const userId = req.user.userId;
    const payload = req.body;
    console.log("query::", userId);
    try {
        const cart = await Cart.findOne({user : new ObjectId(userId)});
        if(!cart){
           return res.json({ status: 404, message: "can't update as the cart doesnot exists" });
        } 
        const itemExists = cart.items.find((item)=> item.product.toString() === payload.productId);
        console.log('itemExists', itemExists);
        if(itemExists) {
            itemExists.quantity +=  payload.quantity || 1;
        } else {
            cart.items.push({product: payload.productId, quantity: payload.quantity || 1});
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send('server error');
    }
})


module.exports = router;
