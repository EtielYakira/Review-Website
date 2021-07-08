const express = require('express');
const db = 'loopsi' //require('../DATA/places.json')
const router = express.Router();
// const getPlaces = require('../DATA/api')
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'th,htkvnkl',
  database: 'reviewwebsite'
});



router.get('/', function(req, res, next) {
  let order = req.params.order || ''
  connection.query(`select p.id, p.categoryID, p.name,p.summeryText, p.image, ifnull(FORMAT(avg(r.rating),1),0) as rating from places p left join reviews r on (r.placeID = p.id) group by p.id order by rating ${order}`, (err,rows) => {
      if(err) throw err;
      res.send(rows)
    });
});
router.get('/:id', function(req, res, next) {
  let id = req.params.id 
  connection.query(`select * from places where id =  ${id}`, (err,rows) => {
      if(err) throw err;
      res.send(rows)
    });
});
router.post('/' ,function(req, res, next){
  connection.query('INSERT INTO places SET ?',
  [req.body],
  function (err,result) {
    if(err) throw err;
    res.send(result)
  })
  
})

module.exports = router;
