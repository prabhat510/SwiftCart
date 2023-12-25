const express = require('express');
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const Razorpay = require('razorpay');
const app = express();
require('./db/conn')();
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(
    cors({
      origin: "*",
    })
  );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();  

app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);


app.post('/api/payment/orderid', async (req, res)=>{

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


app.post('/api/payment/status', async (req, res)=>{

  const paymentStatusPayload = req.body;
  try {
    console.log(paymentStatusPayload, "payment status recieved");
    res.status(200).redirect("http://localhost:4200");
  } catch (error) {
    res.status(500).send("server error");
  }
})

const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{
    console.log('listening on::', PORT);
})