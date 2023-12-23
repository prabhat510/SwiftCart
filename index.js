const express = require('express');
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
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

const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{
    console.log('listening on::', PORT);
})