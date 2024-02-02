const router = require('express').Router();
const { ObjectId } = require("mongodb");
const Cart  = require('../models/cartModel');
const verifyToken = require('../auth/authVerify');

// get all the cart items
router.get('/items', verifyToken, async (req, res)=>{
    const userId = req.user.userId;
    try{
        const items = await Cart.find({user: userId}).populate('items items.product items.quantity');
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


/**
 * if items exists update quantity of an item in the cart, else push the item to the cart
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
            itemExists.quantity =  payload.quantity || 1;
        } else {
            cart.items.push({product: payload.productId, quantity: payload.quantity || 1});
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send('server error');
    }
})

/**
 * delete a single item from cart
 * payload:: {
    "productId": "65871718381350d6ce3e5bcc",
}
 */

router.delete('/remove', verifyToken, async(req, res)=>{
    const userId = req.user.userId;
    const payload = req.body;
    console.log("query::", userId);
    console.log("query::", payload.productId);
    try {
        const cart = await Cart.findOne({user : new ObjectId(userId)});
        if(!cart){
           return res.json({ status: 404, message: "can't update as the cart doesnot exists" });
        } 
        console.log('cart items before', cart.items.length, cart.items);
        cart.items = cart.items.filter((item)=> item.product.toString() !== payload.productId);
        await cart.save();
        console.log('cart items after', cart.items.length, cart.items);
        res.status(200).json({message: "item removed successfully"});
    } catch (error) {
        res.status(500).send('server error');
    }
})

// delete all items which belong to the given orderId
router.delete('/remove/items', verifyToken, async(req, res)=>{
    const userId = req.user.userId;
    const order_id = req.body.order_id;
    console.log("order id is::", order_id);
    try {
        const cart = await Cart.findOne({user : new ObjectId(userId)});
        if(!cart){
           return res.status(404).send("cart doesnot exists");
        } 
        console.log('cart items before', cart.items.length, cart.items);
        cart.items = cart.items.filter((item)=>{
           return item.orderId !== order_id;
        })
        await cart.save();
        console.log('cart items after', cart.items.length, cart.items);
        res.status(200).send("cart cleared successfully");
    } catch (error) {
        res.status(500).send('server error');
    }
})

// get the count of items in the cart
router.get('/count', verifyToken, async (req, res)=>{
    const userId = req.user.userId;
    try{
        const cart = await Cart.findOne({user: userId}).populate('items');
        if(cart) {
            res.status(200).json({count: cart.items.length});
        } else {
            res.status(404).send("cart not found");
        }
    } catch (e) {
        res.status(500).json({msg: "Internal server error"});
    }
})

router.put('/update/:orderId', async (req, res)=>{
    const userId = req.user.userId;
    try{
        const cart = await Cart.findOne({user: userId});
        if(cart) {
            cart.items
            // res.status(200).json({count: cart.items.length});
        } else {
            res.status(404).send("cart not found");
        }
    } catch (e) {
        res.status(500).json({msg: "Internal server error"});
    }
})

module.exports = router;