const db = require("../models/index");
const theImage = db.images;
const Place = db.places;
const Review = db.reviews;
const User = db.users;

exports.findAll = (req, res) => {

    return theImage.findAll({
      include: [
        {
          model: Review,
          as: "reviews",
          attributes: [],
  
          include: [
            {
              model: User,
              as: "user",
              attributes: ["name"],
            },
            {
                model: Place,
                as:'place',
                attributes: ["name",'id'],
            },
          ],
        },
      ],
    })
      .then((places) => {
        res.send(places);
      })
      .catch((err) => console.log(err));
  };