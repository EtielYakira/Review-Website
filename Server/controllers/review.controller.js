const db = require("../models/index");
const Review = db.reviews;
const reviewImages = db.images;
const User = db.users;
const Image = db.images;

exports.createReview = (req, res) => {
  return Review.create({
    placeId: req.body.placeId,
    userId: `${JSON.parse(req.cookies.session_id).id}`,
    postDate: Date.now(),
    rating: req.body.rating,
    reviewBody: req.body.reviewBody,
  })
    .then((review) => {
      console.log(req.files, "list of files!!!!");
      for (let index = 0; index < req.files.length; index++) {
        reviewImages.create({
          reviewId: review.id,
          userId: JSON.parse(req.cookies.session_id).id,
          image: req.files[index].filename,
        });
      }
      console.log(">> Created review: " + JSON.stringify(review, null, 4));
      res.send(review);
    })
    .catch((err) => {
      console.log(">> Error while creating review: ", err);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  return Review.update(req.body, {
    where: { id: id },
  })
  .then((review) => {
    console.log(req.files, "list of files!!!!");
    for (let index = 0; index < req.files.length; index++) {
      reviewImages.create({
        reviewId: id,
        userId: JSON.parse(req.cookies.session_id).id,
        image: req.files[index].filename,
      })}})
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "review was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update review with id=${id}. Maybe review was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating review with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  return Review.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
      {
        model: Image,
        as: "images",
        attributes: ["id","image"],
      },
    ],
  })
    .then((reviews) => {
      res.send(reviews);
    })
    .catch((err) => console.log(err));
};

exports.findOneById = (req, res) => {
  let reviewId = req.params.id;
  return Review.findByPk(reviewId, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
      {
        model: Image,
        as: "images",
        attributes: ["id","image"],
      },
    ],
  })
    .then((review) => {
      res.send(review);
    })
    .catch((err) => {
      console.log(">> Error while finding review: ", err);
    });
};
