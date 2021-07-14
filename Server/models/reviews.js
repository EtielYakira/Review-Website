const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reviews', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    placeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'places',
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
    postDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reviewBody: {
      type: DataTypes.STRING(550),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'reviews',
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
        name: "FK_Review_Place_idx",
        using: "BTREE",
        fields: [
          { name: "placeId" },
        ]
      },
      {
        name: "FK_Review_User_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
