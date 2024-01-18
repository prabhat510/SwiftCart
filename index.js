const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require('./db/conn')();
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use(
    cors({
      origin: "*",
    })
  );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();  

app.use('/api/auth', userRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/images', express.static('./images'))


app.get('/api/status', (req, res)=>{
  res.status(200).send("ok");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('listening on::', PORT);
})


module.exports = app;