module.exports = (sequelize, DataTypes) => {
    const User2 = sequelize.define("user", {
      name: {
        type: DataTypes.STRING(45),
      },
      password: {
        type: DataTypes.INTEGER
      },
      email: {
        type: DataTypes.STRING
      },
      subscription: {
        type: DataTypes.BOOLEAN
      },
      profileImage: {
        type: DataTypes.STRING
      },
      preferredCategory: {
        type: DataTypes.STRING
      },
    });
  
    return User2;
  };