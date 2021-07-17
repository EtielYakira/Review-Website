const express = require('express');
const router = express.Router();
const places = require("../controllers/place.controller.js");
const reviews = require("../controllers/review.controller.js");
const upload = require('../upload/upload')
const checkImages = require('../upload/checkImages')
const util = require('util')



router.route("/:reviewId")
      .get(places.findPlaceById)
      .put(places.update)
router.route("/")
      .post(upload.array("images"),reviews.createReview)
module.exports = router;
