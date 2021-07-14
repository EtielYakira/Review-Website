const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('images_likes', {
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'images',
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
    }
  }, {
    sequelize,
    tableName: 'images_likes',
    timestamps: false,
    indexes: [
      {
        name: "FK_images_likes_images_idx",
        using: "BTREE",
        fields: [
          { name: "imageId" },
        ]
      },
      {
        name: "FK_images_likes_user_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
