const express = require('express');
const multer = require('multer');
const router = express.Router();
const places = require("../controllers/place.controller.js");
const upload = require('../upload/upload')

const storage = multer.diskStorage({
      destination:(req,file,callback) => {
            callback(null,'../../Client/public/uploads/');
      },
      filename: (req,file,callback ) => {
            callback(null,file.originalname);
      }
})

const upload2 = multer({storage:storage})



router.route("/:placeId")
      // .get((res,req) => res.send())
      .get(places.findPlaceById)
      .put(places.update)
      .delete(places.delete);
router.route("/")
      .get(places.findAll)
      // .post(places.createPlace)
      .post(upload,places.createPlace)
router.route('/:placeId/write-review')
      .post(places.createReview)
module.exports = router;
