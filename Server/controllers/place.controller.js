const db = require("../models/index");
const place_tags = db.place_tags;
const Tags = db.tags;
const Place = db.places;
const Review = db.reviews;
const User = db.users;
const Image = db.images;
const Place_tags = db.place_tags

exports.createPlace = (req,res) => {
  return Place.create({
    name: req.body.name,
    userId:JSON.parse(req.cookies.session_id).id,
    establishDate: req.body.establishDate,
    image: req.file.filename,
    owner: req.body.owner,
    streetName: req.body.streetName,
    streetNumber: req.body.streetNumber,
    country: req.body.country,
    openingHour: req.body.openingHour,
    closingHour: req.body.closingHour,
    verified: req.body.verified,
    summeryText: req.body.summeryText,
    categoryId: req.body.category,
  })
    .then((place) => {
      console.log(req.body);
      console.log(">> Created place: " + JSON.stringify(place, null, 4));
      req.body.tags.split(',').forEach(tag => Place_tags.create({
        tagId:+tag,
        placeId:+place.id,
      }) )
      res.send(place);
    })
    .catch((err) => {
      console.log(">> Error while creating place: ", err);
    });
};

exports.createReview = (req, res) => {
  let placeId = req.params.placeId;
  let review = req.body;
  return Review.create({
    postDate: review.postDate,
    reviewBody: review.reviewBody,
    rating: review.rating,
    placeId: placeId,
    userId: review.userId,
  })
    .then((review) => {
      console.log(">> Created review: " + JSON.stringify(review, null, 4));
      res.send(review);
    })
    .catch((err) => {
      console.log(">> Error while creating review: ", err);
    });
};

exports.findPlaceById = (req, res) => {
  let placeId = req.params.placeId;
  return Place.findByPk(placeId, {
    include: [
      {
        model: Review,
        as: "reviews",

        include: [
          {
            model: User,
            as: "user",
            attributes: ["name"],
          },
          {
            model: Image,
            as: "images",
            attributes: ["image"],
          },
        ],
      },
      {
        model: Tags,
        as: "tags",
        attributes: ["name"],
      },
    ],
  })
    .then((place) => {
      res.send(place);
    })
    .catch((err) => {
      console.log(">> Error while finding place: ", err);
    });
};

exports.findReviewById = (id) => {
  return Review.findByPk(id, { include: ["place"] })
    .then((review) => {
      return review;
    })
    .catch((err) => {
      console.log(">> Error while finding review: ", err);
    });
};
exports.findReviewByIdWithUser = (req, res) => {
  let reviewId = req.params.reviewId;
  return Review.findByPk(id, { include: ["user"] })
    .then((review) => {
      res.send(review);
    })
    .catch((err) => {
      console.log(">> Error while finding review: ", err);
    });
};

exports.findAll = (req, res) => {

  return Place.findAll({
    include: [
      {
        model: Review,
        as: "reviews",

        include: [
          {
            model: User,
            as: "user",
            attributes: ["name"],
          },
          {
            model: Image,
            as: "images",
            attributes: ["image"],
          },
        ],
      },
      {
        model: Tags,
        as: "tags",
        attributes: ["name"],
      },
    ],
  })
    .then((places) => {
      res.send(places);
    })
    .catch((err) => console.log(err));
};

exports.update = (req, res) => {
  const id = req.params.id;

  Place.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};
