const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    imageData: { type: Buffer },
    contentType: { type: String},
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;