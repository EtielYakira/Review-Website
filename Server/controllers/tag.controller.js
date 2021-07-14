const db = require("../models/index");
const Tag = db.tags;

exports.findAll = (req,res) => {
    return Tag.findAll().then((tags) => {
      res.send(tags);
    });
  };