const express = require('express');
const router = express.Router();
const users = require("../controllers/user.controller.js");


router.route("/signin")
      .post(users.findOneByName)
router.route("/:userId")
      .get(users.findOneByID)
      .put(users.update)
      .delete(users.delete);
router.route("/")
      .post(users.create)
      .get(users.findAll)
      .delete(users.deleteAll);
module.exports = router;
