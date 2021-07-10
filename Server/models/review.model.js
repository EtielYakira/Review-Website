module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("review", {
      postDate: {
        type: DataTypes.DATE
      },
      rating: {
        type: DataTypes.INTEGER
      },
      reviewBody: {
        type: DataTypes.STRING
      }
    });
  
    return Review;
  };