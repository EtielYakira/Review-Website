'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;












db.places.hasMany(db.reviews, { as: "reviews" });
db.reviews.belongsTo(db.places, {foreignKey: "placeId", as: "place",});

db.reviews.hasMany(db.images, { as: "images" });
db.images.belongsTo(db.images, {foreignKey: "reviewId", as: "review",});


db.reviews.hasOne(db.users,{as:'user',foreignKey:'id'})
db.users.belongsTo(db.reviews,{foreignKey:'userId',as:'user'})


db.places.belongsToMany(db.tags, {
  through: "place_tags",
  as: "tags",
  foreignKey: "placeId",
});

db.tags.belongsToMany( db.places, {
  through: "place_tags",
  as: "places",
  foreignKey: "tagId",
});




// db.places.belongsToMany(db.tags, { through: 'place_tags' });
// db.tags.belongsToMany(db.places, { through: 'place_tags' });

//   db.tags.belongsToMany(db.users, { as: 'userId_users', through: db.user_tags, foreignKey: "tagId", otherKey: "userId" });
//   db.users.belongsToMany(db.tags, { as: 'tagId_tags', through: db.user_tags, foreignKey: "userId", otherKey: "tagId" });








module.exports = db;
