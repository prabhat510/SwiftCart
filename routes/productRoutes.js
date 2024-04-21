const router = require("express").Router();
const Product  = require("../models/productModel");
const Review  = require('../models/reviewModel');
const { ObjectId } = require("mongodb");

router.post("/create", async (req, res) => {
  const productPayload = req.body;
  try {
    const productAlreadyPresent = await Product.findOne({
      productIdentifier: productPayload.productIdentifier
      });
      if(productAlreadyPresent) {
        res.status(409).json({ status: 409, message: "product already exists" });
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
    res.status(200).json({products: products, totalCount: productsCount});
  } catch (error) {
    console.log(error);
  }
});


router.delete("/delete/:productIdentifier", async (req, res) => {
  try{
    const productIdentifier = req.params.productIdentifier;
    const product  = await Product.findOneAndDelete({productIdentifier});
    res.status(204).json(product);
  }catch (e) {
    res.status(500).json({});
  }
})

router.get("/:productIdentifier", async (req, res) => {
  try{
    const productIdentifier = req.params.productIdentifier;
    const product  = await Product.findOne({_id: productIdentifier}).populate('seller');
    res.status(200).json(product);
  }catch (e) {
    res.status(500).json({});
  }
})

router.get("/productdetail/:productIdentifier", async (req, res)=>{
  try {
    const productIdentifier = req.params.productIdentifier;
    console.log("heya", productIdentifier);
    const orders  = await Product.findOne({_id: productIdentifier}, {orderCount: 1});
    const reviews = await Review.find({ product: new ObjectId(productIdentifier) }).populate("user", {name: 1, username: 1}, );
    let sum = 0;
    let averageRating = 0;
    for(const review of reviews) {
      sum += review;
    }
    if(reviews.length > 0) {
      averageRating = sum/reviews.length;
    }
    res.json({
      data: {
        totalOrders: orders.orderCount,
        totalReviews: reviews.length,
        rating: averageRating,
        reviews: reviews
      }
    })
  } catch (error) {
    console.log("error", error);
    res.sendStatus(500);
  }  
})


module.exports = router;
