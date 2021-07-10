const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.places = require("./place.model.js")(sequelize, Sequelize);
db.reviews = require("./review.model.js")(sequelize, Sequelize);
db.users = require('./user2.model')(sequelize, Sequelize)


db.places.hasMany(db.reviews, { as: "reviews" });
db.users.hasMany(db.reviews, { as: "reviews" });
db.reviews.belongsTo(db.places, {
  foreignKey: "placeID",
  as: "place",
});
db.reviews.belongsTo(db.users, {
  foreignKey: "userID",
  as: "user",
});
module.exports = db;
