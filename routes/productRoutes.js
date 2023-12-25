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

router.get("/", async (req, res) => {
  const offset = req.query.offset;
  const limit = req.query.limit;
  try {
    const productsCount = await Product.find().countDocuments();
    const products = await Product.find().sort({_id: 1}).skip(parseInt(offset)).limit(parseInt(limit));
    res.json({products: products, totalCount: productsCount});
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
