const router = require('express').Router();
const multer = require('multer');
const Image = require('../models/imageModel');


// Configure Multer for handling image uploads
const storage = multer.memoryStorage(); // Store the image in memory as Buffer
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const image = new Image({
        imageData: req.file.buffer, // Image data as Buffer
        contentType: req.file.mimetype, // Image content type
        product: req.body.product
      });
      const alreadyExists = await Image.find({product: req.body.product});
      console.log("product::", alreadyExists)
      if(alreadyExists.length!==0) {
        res.status(403).send("image for this product already exits");
      } else {
        await image.save();
        res.status(201).json({ success: true });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
  
  // Get all images route
router.get('/', async (req, res) => {
    try {
      const images = await Image.find({}, '_id contentType');
      res.json(images);
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
  // Get image by ID route
router.get('/:id', async (req, res) => {
    try {
      const image = await Image.findById(req.params.id);
  
      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      res.set('Content-Type', image.contentType);
      res.send(image.imageData);
    } catch (error) {
      console.error('Error fetching image by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

/**
 * image: _id(populate Image field)
 */