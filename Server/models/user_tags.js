const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_tags', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tags',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_tags',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tagID" },
          { name: "userID" },
        ]
      },
      {
        name: "FK_user_favorite_user_idx",
        using: "BTREE",
        fields: [
          { name: "userID" },
        ]
      },
    ]
  });
};
