const db = require("../models/index");
const Review = db.reviews;
const reviewImages = db.images

exports.createReview = (req,res) => {
    
    return Review.create({
        placeId:req.body.placeId,
        userId:JSON.parse(req.cookies.session_id).id,
        postDate:Date.now(),
        rating:req.body.rating,
        reviewBody:req.body.reviewBody,
    })
      .then((review) => {
          console.log(req.files);
          for (let index = 0; index < req.files.length; index++) {
            reviewImages.create({
                reviewId:review.id,
                userId:JSON.parse(req.cookies.session_id).id,
                image:req.files[index].filename,
              })              
          }
        console.log(">> Created review: " + JSON.stringify(review, null, 4));
         res.send(review);
      })
      .catch((err) => {
        console.log(">> Error while creating review: ", err);
      });
  };
