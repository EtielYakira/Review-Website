const express = require('express');
const router = express.Router();
const reviews = require("../controllers/review.controller.js");
const upload = require('../upload/upload')


router.route("/")
      .get(reviews.findAll)
      .post(upload.array('reviewImages'),reviews.createReview)
router.route('/:id')
      .get(reviews.findOneById)
      .put(upload.array('reviewImages'),reviews.update)
module.exports = router;
