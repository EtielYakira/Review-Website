const db = require("../models/index");
const Category = db.categoryies;

exports.findAll = (req,res) => {
    return Category.findAll().then((categoryies) => {
      res.send(categoryies);
    });
  };