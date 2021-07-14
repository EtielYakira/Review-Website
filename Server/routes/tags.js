const express = require('express');
const router = express.Router();
const tags = require("../controllers/tag.controller.js");



router.route("/")
      .get(tags.findAll)
router.route("/:id")
      .get(tags.findAll)

module.exports = router;
