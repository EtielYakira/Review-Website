const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('places', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categoryies',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    establishDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    owner: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    streetName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    streetNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    openingHour: {
      type: DataTypes.TIME,
      allowNull: true
    },
    closingHour: {
      type: DataTypes.TIME,
      allowNull: true
    },
    verified: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    summeryText: {
      type: DataTypes.STRING(5000),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'places',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "userID_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "categotyID_idx",
        using: "BTREE",
        fields: [
          { name: "categoryId" },
        ]
      },
    ]
  });
};
