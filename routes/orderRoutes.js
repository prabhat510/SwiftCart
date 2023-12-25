const router = require('express').Router();
const Order  = require('../models/orderModel');

router.post('/create/:userId', async (req, res)=> {
    const userId = req.params.userId;
    const orderPayload = req.body;
    orderPayload['userId'] = userId;
    try {
        const order = new Order(orderPayload);
        console.log(order);
        const addedProduct = await Order.create(order)
        res.status(200).json(addedProduct);
    } catch (error) {
        res.status(500).send('server error');
    }
})

module.exports = router;