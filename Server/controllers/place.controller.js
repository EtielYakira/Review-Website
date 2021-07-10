const db = require("../models");
const Place = db.places;
const Review = db.reviews;


exports.createPlace = (place) => {
    return Place.create({
        name:place.name,
        establishDate:place.establishDate,
        image:place.image,
        owner:place.owner,
        streetName:place.streetName,
        streetNumber:place.streetNumber,
        country:place.country,
        openingHour:place.openingHour,
        closingHour:place.closingHour,
        verified:place.verified,
        summeryText:place.summeryText
    })
      .then((place) => {
        console.log(">> Created place: " + JSON.stringify(place, null, 4));
        return place;
      })
      .catch((err) => {
        console.log(">> Error while creating place: ", err);
      });
  };

  exports.createReview = (placeId, review) => {
    return Review.create({
      postDate: review.postDate,
      reviewBody: review.reviewBody,
      rating: review.rating,
      placeId: review.placeId,
      userId:review.userId
    })
      .then((review) => {
        console.log(">> Created review: " + JSON.stringify(review, null, 4));
        return comment;
      })
      .catch((err) => {
        console.log(">> Error while creating review: ", err);
      });
  };

  exports.findTutorialById = (placeId) => {
    return Place.findByPk(PlaceId, { include: ["reviews"] })
      .then((place) => {
        return place;
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

  exports.findAll = () => {
    return Place.findAll({
      include: ["reviews"],
    }).then((places) => {
      return places;
    });
  };