const express = require('express');
const router = express.Router();
const categories = require("../controllers/categories.controller.js");



router.route("/")
      .get(categories.findAll)
router.route("/:id")
      .get(categories.findAll)

module.exports = router;
