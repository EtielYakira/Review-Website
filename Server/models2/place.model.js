module.exports = (sequelize, DataTypes) => {
    const Place = sequelize.define("place", {
      name: {
        type: DataTypes.STRING(255),
      },
      establishDate: {
        type: DataTypes.DATE
      },
      image: {
        type: DataTypes.STRING
      },
      owner: {
        type: DataTypes.STRING
      },
      streetName: {
        type: DataTypes.STRING
      },
      streetNumber: {
        type: DataTypes.INTEGER
      },
      country: {
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
  
    return Place;
  };