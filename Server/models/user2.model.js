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
      streetNumber: {
        type: DataTypes.INTEGER
      },
      preferredCategory: {
        type: DataTypes.STRING
      },
      openingHour: {
        type: DataTypes.TIME
      },
      closingHour: {
        type: DataTypes.TIME
      },
      verified: {
        type: DataTypes.BOOLEAN
      },
      summeryText: {
        type: DataTypes.STRING(5000)
      },
    });
  
    return User2;
  };