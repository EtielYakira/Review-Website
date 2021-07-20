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

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    theImage.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Image was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Image with id=${id}. Maybe Image was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id,
        });
      });
  };