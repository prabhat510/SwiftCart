const router = require('express').Router();
const { ObjectId } = require("mongodb");
const Cart  = require('../models/cartModel');
const {verifyToken} = require("../auth/authVerify");

// get all the cart items
router.get('/items/:userId', verifyToken, async (req, res)=>{
    const userId = req.params.userId;
    try{
        const items = await Cart.find({userId}).populate('productId');
        console.log(items);
        res.status(200).json({items});
    } catch (e) {
        res.status(500).json({msg: "Internal server error"});
    }
})

router.post('/item/exists/:userId', verifyToken, async (req, res)=>{
    const userId = req.params.userId;
    const productId = req.body.productId;
    try{
        const items = await Cart.findOne({userId, productId}, '_id quantity');
        console.log(items);
        res.status(200).json(items);
    } catch (e) {
        res.status(500).json({msg: "Internal server error"});
    }
})

// add a new item in the cart
router.post('/addItem/:userId', verifyToken, async (req, res)=> {
    // userId and productId are mongodb's internal identifier
    const userId = req.params.userId;
    const productId = req.body.productId;

    try {
        const productExistInCart = await Cart.findOne({userId : new ObjectId(userId), productId: new ObjectId(productId)});
        if(productExistInCart){
            res.json({ status: 409, message: "item already exists in cart" });
        } else {
            const addedProduct = await Cart.create({
                userId,
                ...req.body
            })
            res.status(200).json(addedProduct);
        }
    } catch (error) {
        res.status(500).send('server error');
    }
})

// add/remove a item from the cart
router.put('/updateItem/:userId', verifyToken, async(req, res)=>{
    const userId = req.params.userId;
    const productId = req.body.productId;

    try {
        const productExistInCart = await Cart.findOne({userId : new ObjectId(userId), productId: new ObjectId(productId)});

        if(!productExistInCart){
            res.json({ status: 409, message: "item does not exists in cart" });
        }else{
            const updatedProduct = await Cart.updateOne({_id: productExistInCart._id}, req.body)
            res.status(200).json(updatedProduct);
        }
    } catch (error) {
        res.status(500).send('server error');
    }
})

// remove item from the cart
router.delete('/deleteItem/:userId', verifyToken, async(req, res)=>{
    const userId = req.params.userId;
    const productId = req.body.productId;

    try {
        const productExistInCart = await Cart.findOne({userId : new ObjectId(userId), productId: new ObjectId(productId)});

        if(!productExistInCart){
            res.json({ status: 409, message: "item does not exists in cart" });
        }else{
            const deleteProduct = await Cart.findByIdAndDelete(productExistInCart._id)
            res.status(200).json(deleteProduct);
        }
    } catch (error) {
        res.status(500).send('server error');
    }
})

module.exports = router;
