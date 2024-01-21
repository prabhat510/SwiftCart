const router = require('express').Router();
const Razorpay = require('razorpay');
const Payment = require('../models/paymentModel');
const verifyToken = require('../auth/authVerify');
const verifyPaymentSource = require('../auth/sourceVerify');
const Order = require('../models/orderModel');
const crypto = require('crypto');



router.post('/orderid', verifyToken, async (req, res)=>{

    const paymentPayload = req.body;
    try {
      if(paymentPayload && paymentPayload.amount && paymentPayload.currency && paymentPayload.reciept) {
        const instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })
        instance.orders.create({
          amount: paymentPayload.amount,
          currency: paymentPayload.currency,
          receipt: paymentPayload.receipt,
          notes: {
            key1: "value3",
            key2: "value2"
          }
        }).then(response=>{
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
  const razorpayPayload = req.body;
  const order_id = req.query.orderId;
  console.log("order_id query::", order_id);
  if(!order_id) {
    return res.status(401);
  }
  try {
    console.log("razorpay payment payload::", razorpayPayload);

    if(razorpayPayload && razorpayPayload.hasOwnProperty('error')) {
      // something went wrong with the payment
      const metadata = JSON.parse(razorpayPayload.error.metadata);
      const paymentId = metadata.payment_id;
      const order = await Order.findOne({orderId: order_id});
      order.paymentStatus = "failed";
      await order.save();
      await Payment.create({
        order: order?._id,
        statuscode: 500, 
        paymentId: paymentId || null,
        orderId: order_id,
        signature: "",
        verificationStatus: "failed",
        remarks: razorpayPayload.error.description
      });
      return res.redirect(`${process.env.ORIGIN}/order-summary?orderId=${orderId}`);
    }
    const orderId = razorpayPayload.razorpay_order_id;
    const order = await Order.findOne({orderId: orderId});
    const secretKey = process.env.KEY_SECRET;
    const hmac = crypto.createHmac('sha256', secretKey);  
    // Passing the data to be hashed 
    hmac.update(orderId + "|" + razorpayPayload.razorpay_payment_id); 
      
    // Creating the hmac in the required format 
    const generated_signature = hmac.digest('hex'); 
    let verificationStatus = "";
    if (generated_signature === razorpayPayload.razorpay_signature) {
        console.log("payment verification was is successfull");
        verificationStatus = "success";
    } else {
        console.log("payment could not be verified");
        verificationStatus = "failed";
    }
    order.paymentStatus = verificationStatus;
    await order.save();
    await Payment.create({
      order: order?._id,
      statuscode: 200, 
      paymentId: razorpayPayload.razorpay_payment_id,
      orderId: razorpayPayload.razorpay_order_id,
      signature: razorpayPayload.razorpay_signature,
      verificationStatus: verificationStatus
    });
    return res.redirect(`${process.env.ORIGIN}/order-summary?orderId=${order_id}`);
  } catch (error) {
    return res.redirect(`${process.env.ORIGIN}/order-summary?orderId=${order_id}`);
  }
})


router.get('/details', verifyToken, async (req, res)=>{
  const orderId = req.query.orderId;
  try {
    if(orderId) {
      const payment = await Payment.findOne({orderId: orderId});
      return res.status(200).json({payment: payment});
    }
    return res.sendStatus(404);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;