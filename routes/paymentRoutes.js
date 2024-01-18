const router = require('express').Router();
const Razorpay = require('razorpay');
const Payment = require('../models/paymentModel');
const verifyToken = require('../auth/authVerify');
const verifyPaymentSource = require('../auth/sourceVerify');
const Order = require('../models/orderModel');

router.post('/orderid', verifyToken, async (req, res)=>{

    const paymentPayload = req.body;
    try {
      if(paymentPayload && paymentPayload.amount && paymentPayload.currency && paymentPayload.reciept) {
        const instance = new Razorpay({ key_id: 'rzp_test_Vsyn9DFkRneYcm', key_secret: 'oWyIiFM2xdmolg3mKgFUlaTj' })
        instance.orders.create({
          amount: paymentPayload.amount,
          currency: paymentPayload.currency,
          receipt: paymentPayload.receipt,
          notes: {
            key1: "value3",
            key2: "value2"
          }
        }).then(response=>{
          console.log('res::', res)
          res.json(response);
        }).catch(error=>{
          res.status(500).send();
        })
      } else {
        res.status(500).send();
      }
    } catch (error) {
      res.status(500).send("server error");
    }
})
  
  
router.post('/status', verifyPaymentSource, async (req, res)=>{
    const paymentStatusPayload = req.body;
    const clientURL = req.get('referer');
    console.log("complete url::", clientURL);
    try {
      console.log("razorpay payment payload::", paymentStatusPayload);
      const orderId = paymentStatusPayload.razorpay_order_id;
      const order = await Order.findOne({orderId: orderId});
      console.log("order::...", order);
      await Payment.create({
        order: order?._id,
        statuscode: 200, 
        paymentId: paymentStatusPayload.razorpay_payment_id,
        orderId: paymentStatusPayload.razorpay_order_id,
        signature: paymentStatusPayload.razorpay_signature
      });
      res.status(200).redirect(`http://localhost:4200/order-summary?orderId=${paymentStatusPayload.razorpay_order_id}`);
    } catch (error) {
      res.redirect();
    }
})

  module.exports = router;