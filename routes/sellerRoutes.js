const router = require('express').Router();
const Seller  = require('../models/sellerModel');
const verifyToken = require('../auth/authVerify');
const { ObjectId } = require("mongodb");

router.post('/create', verifyToken, async (req, res)=> {
    const userId = req.user.userId;
    const sellerPayload = req.body;
    sellerPayload['user'] = userId;
    try {
        console.log('creating seller::', sellerPayload);
        const addedSeller = await Seller.create(sellerPayload);
        res.status(200).json(addedSeller);
    } catch (error) {
        res.status(500).send('server error');
    }
})

// get list of sellers on the platform
router.get('/list', verifyToken, async (req, res)=> {
    try {
        const sellers = await Seller.find();
        return res.status(200).json(sellers);
    } catch (error) {
        res.status(500).send('server error');
    }
})

// get seller profile
router.get('/:sellerId', verifyToken, async (req, res)=> {
    const sellerId = req.params.sellerId;
    try {
        const seller = await Seller.findOne({_id: new ObjectId(sellerId)});
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).send('server error');
    }
})


module.exports = router;