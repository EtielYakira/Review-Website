var DataTypes = require("sequelize").DataTypes;
var _categoryies = require("./categoryies");
var _images = require("./images");
var _images_likes = require("./images_likes");
var _place_tags = require("./place_tags");
var _places = require("./places");
var _reviews = require("./reviews");
var _tags = require("./tags");
var _user_tags = require("./user_tags");
var _users = require("./users");

function initModels(sequelize) {
  var categoryies = _categoryies(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var images_likes = _images_likes(sequelize, DataTypes);
  var place_tags = _place_tags(sequelize, DataTypes);
  var places = _places(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var user_tags = _user_tags(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  tags.belongsToMany(users, { as: 'userId_users', through: user_tags, foreignKey: "tagId", otherKey: "userId" });
  users.belongsToMany(tags, { as: 'tagId_tags', through: user_tags, foreignKey: "userId", otherKey: "tagId" });
  places.belongsTo(categoryies, { as: "category", foreignKey: "categoryId"});
  categoryies.hasMany(places, { as: "places", foreignKey: "categoryId"});
  tags.belongsTo(categoryies, { as: "categoty", foreignKey: "categotyId"});
  categoryies.hasMany(tags, { as: "tags", foreignKey: "categotyId"});
  images_likes.belongsTo(images, { as: "image", foreignKey: "imageId"});
  images.hasMany(images_likes, { as: "images_likes", foreignKey: "imageId"});
  place_tags.belongsTo(places, { as: "place", foreignKey: "placeId"});
  places.hasMany(place_tags, { as: "place_tags", foreignKey: "placeId"});
  reviews.belongsTo(places, { as: "place", foreignKey: "placeId"});
  places.hasMany(reviews, { as: "reviews", foreignKey: "placeId"});
  images.belongsTo(reviews, { as: "review", foreignKey: "reviewId"});
  reviews.hasMany(images, { as: "images", foreignKey: "reviewId"});
  place_tags.belongsTo(tags, { as: "tag", foreignKey: "tagId"});
  tags.hasMany(place_tags, { as: "place_tags", foreignKey: "tagId"});
  user_tags.belongsTo(tags, { as: "tag", foreignKey: "tagId"});
  tags.hasMany(user_tags, { as: "user_tags", foreignKey: "tagId"});
  images.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(images, { as: "images", foreignKey: "userId"});
  images_likes.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(images_likes, { as: "images_likes", foreignKey: "userId"});
  places.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(places, { as: "places", foreignKey: "userId"});
  reviews.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "userId"});
  user_tags.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(user_tags, { as: "user_tags", foreignKey: "userId"});

  return {
    categoryies,
    images,
    images_likes,
    place_tags,
    places,
    reviews,
    tags,
    user_tags,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
