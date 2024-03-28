const router = require('express').Router();
const Review  = require('../models/reviewModel');
const verifyToken = require('../auth/authVerify');
const { ObjectId, ReturnDocument } = require("mongodb");

router.post('/create', verifyToken, async (req, res)=> {
    const userId = req.user.userId;
    const reviewPayload = req.body;
    reviewPayload['user'] = userId;
    try {
        console.log('creating review::', reviewPayload);
        const addedReview = await Review.create(reviewPayload);
        res.status(200).json(addedReview);
    } catch (error) {
        res.status(500).send('server error');
    }
})


// get my review
router.get('/:reviewId', verifyToken, async (req, res)=> {
    const reviewId = req.params.reviewId;
    try {
        const review = await Review.findOne({_id: new ObjectId(reviewId)}).populate('user');
        res.status(200).json(review);
    } catch (error) {
        res.status(500).send('server error');
    }
})

// edit my review
router.put('/:reviewId', verifyToken, async (req, res)=> {
    const reviewId = req.params.reviewId;
    const updatedReview = req.body;
    updatedReview['user'] = req.user.userId;
    try {
        const review = await Review.findByIdAndUpdate({
            _id: new ObjectId(reviewId)},
            updatedReview,
            {returnDocument: "after"}
        ).populate('user');
        res.status(200).json(review);
    } catch (error) {
        res.status(500).send('server error');
    }
})

// delete my review
router.delete('/:reviewId', verifyToken, async (req, res)=> {
    const reviewId = req.params.reviewId;
    try {
        const review = await Review.findOneAndDelete({_id: new ObjectId(reviewId)});
        res.status(200);
    } catch (error) {
        res.status(500).send('server error');
    }
})


module.exports = router;