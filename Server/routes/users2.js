const express = require('express');
const router = express.Router();
const users = require("../controllers/user2.controller.js");
const auth = require('../auth/auth')
const upload = require('../upload/upload')




router.route("/signin")
      .post(users.findByName)
router.route("/:userId")
      .get(auth,users.findUserById)
      .put(users.update)
      .delete(users.delete);
router.route("/")
      .post(upload.single("profileImage"),users.createUser)
      .get(users.findAll)

module.exports = router;
