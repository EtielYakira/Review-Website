const express = require('express');
const router = express.Router();
const places = require("../controllers/place.controller.js");


router.route("/:reviewId")
      .get(places.findPlaceById)
      .put(places.update)
router.route("/")
      .get(places.findAll)
module.exports = router;
