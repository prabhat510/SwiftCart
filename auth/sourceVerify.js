
function verifyPaymentSource(req, res, next) {
    const sourceClientURL = "https://api.razorpay.com/";
    const clientURL = req.get('referer');;
    if(clientURL !== sourceClientURL) {
        return res.sendStatus(401);
    } 
    next();
}

module.exports = verifyPaymentSource;