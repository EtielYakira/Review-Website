const db = require("../models2/index2");
const User = db.users;


exports.createUser = (req,res) => {

    return User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
        subscription:req.body.subscription,
        profileImage:req.body.profileImage,
        preferredCategory:req.body.preferredCategory,
    })
      .then((user) => {
        console.log(">> Created user: " + JSON.stringify(user, null, 4));
         res.send(user);
      })
      .catch((err) => {
        console.log(">> Error while creating user: ", err);
      });
  };

  exports.findUserById = (req,res) => {
    let userId = req.params.userId
    return User.findByPk(userId, { include: ["reviews"] })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        console.log(">> Error while finding user: ", err);
      });
  };


  exports.findAll = (req,res) => {
    return User.findAll({
      include: ["reviews"],
    }).then((users) => {
      res.send(users);
    });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + id
        });
      });
  };


  exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with id=" + id
        });
      });
  };

  exports.findByName = (req, res) => {
    return User.findAll({
      include: ["reviews"],
      where:{name:req.body.userName, password:req.body.password}
    }).then((users) => {
      if (users[0]) {
        // res.cookie('session_id', users[0], {expire: 360000 + Date.now()})
        res.cookie('session_id', JSON.stringify({id:users[0].id,name:users[0].name}), {expire: 360000 + Date.now()})
        res.send(users[0]);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not user"
      });
    });
  };