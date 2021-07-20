const express = require('express');
const router = express.Router();
const images = require("../controllers/image.controller.js");
const places = require("../controllers/place.controller.js");




router.route('/')
      .get(places.findAllForGallery)
router.route('/:id')
      .delete(images.delete)
module.exports = router;
