const router = require('express').Router();
const Order  = require('../models/orderModel');
const verifyToken = require('../auth/authVerify');
const { ObjectId } = require("mongodb");

router.post('/create', verifyToken, async (req, res)=> {
    const userId = req.user.userId;
    const orderPayload = req.body;
    orderPayload['user'] = userId;
    try {
        console.log('creating order::payload', orderPayload);
        const addedProduct = await Order.create(orderPayload);
        res.status(200).json(addedProduct);
    } catch (error) {
        res.status(500).send('server error');
    }
})

// get list of orders for a particular user
router.get('/list', verifyToken, async (req, res)=> {
    const userId = req.user.userId;
    try {
        const orders = await Order.find({user: new ObjectId(userId)});
        return res.status(200).json(orders);
    } catch (error) {
        res.status(500).send('server error');
    }
})

router.get('/:orderId', verifyToken, async (req, res)=> {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findOne({orderId: orderId}).populate('user');
        res.status(200).json(order);
    } catch (error) {
        res.status(500).send('server error');
    }
})


module.exports = router;