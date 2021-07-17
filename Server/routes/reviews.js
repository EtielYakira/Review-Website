const express = require('express');
const router = express.Router();
const reviews = require("../controllers/review.controller.js");
const upload = require('../upload/upload')


router.route("/")
      .post(upload.array('reviewImages'),reviews.createReview)
module.exports = router;
