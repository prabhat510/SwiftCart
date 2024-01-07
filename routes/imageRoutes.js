const router = require('express').Router();
const Image = require('../models/imageModel');
  
  // Get all images route
// router.get('/', async (req, res) => {
//     try {
//       const images = await Image.find({}, '_id contentType');
//       res.json(images);
//     } catch (error) {
//       console.error('Error fetching images:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
  
  // Get image by ID route
// router.get('/:id', async (req, res) => {
//     try {
//       const image = await Image.findById(req.params.id);
  
//       if (!image) {
//         return res.status(404).json({ error: 'Image not found' });
//       }
  
//       res.set('Content-Type', image.contentType);
//       res.send(image.imageData);
//     } catch (error) {
//       console.error('Error fetching image by ID:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

module.exports = router;

/**
 * image: _id(populate Image field)
 */