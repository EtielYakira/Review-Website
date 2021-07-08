const express = require("express");
const connection = require("../models/db");
const router = express.Router();

router.get("/", function (req, res, next) {
  connection.query(
    `select
    i.*
    ,u.name as username
    , count(il.imageID) as likes 
    from images i
    left join images_likes il on (i.id = il.imageID)
    left join users u on (u.id = i.userID)
    group by i.id
    order by likes desc
    `,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

module.exports = router;
