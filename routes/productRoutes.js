const router = require("express").Router();
const Product  = require("../models/productModel");

router.post("/create", async (req, res) => {
  const productPayload = req.body;
  try {
    const productAlreadyPresent = await Product.findOne({
      productIdentifier: productPayload.productIdentifier
      });
      if(productAlreadyPresent) {
        res.json({ status: 409, message: "product already exists" });
      } else {
       const product = await Product.create(productPayload);
        res.status(201).json(product);
      }
  } catch (error) {
    res.status(500).send("server error");
  }
});


module.exports = router;
