const router = require('express').Router();
const Order  = require('../models/orderModel');
const { ObjectId } = require("mongodb");

router.post('/create/:userId', async (req, res)=> {
    const userId = req.params.userId;
    const orderPayload = req.body;
    orderPayload['user'] = userId;
    try {
        console.log('create order', orderPayload);
        const addedProduct = await Order.create(orderPayload);
        res.status(200).json(addedProduct);
    } catch (error) {
        res.status(500).send('server error');
    }
})

router.get('/:orderId', async (req, res)=> {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findOne({orderId: orderId});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).send('server error');
    }
})

module.exports = router;